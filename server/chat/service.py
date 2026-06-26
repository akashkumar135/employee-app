from fastapi import UploadFile

from chat.llm import llm
from chat.rag.chunking import chunking
from chat.rag.embedding import embedding
from chat.rag.retrivel import retrival
from chat.repo import add_document_chunks, find_related_chunks
from chat.schema import ChatMessageRequest
from chat.utils import read_file


async def upload_chat_document(id: str, file: UploadFile):

    content = await file.read()

    text_content = read_file(content, file.filename.split(".")[-1])

    # add_file(id, text_content, file.filename)

    document = {}
    document[file.filename] = {"metadata": {"chat_id": id}, "text": text_content}
    print("Chunking....")

    chunked_document = chunking.chunk_all_documents(document)

    print("Chunkign done")
    texts = [chunk["text"] for chunk in chunked_document]

    print("Embedding ")
    embedding_model = embedding.get_embeding_model()
    chunk_embedings = embedding.embed_texts(embedding_model, texts)

    print("Embedding done")

    print("Add document to vector")
    add_document_chunks(chunked_document, chunk_embedings)
    print("Documet saving done")

    return text_content


async def send_chat_message(id: str, data: ChatMessageRequest):

    chat_llm = llm.get_llm()

    agent = llm.get_chat_agent(chat_llm)

    embedding_model = embedding.get_embeding_model()

    embedded_query = embedding.embed_query(embedding_model, data.message)

    context_chunks = find_related_chunks(id, embedded_query)

    formatted_context = retrival.format_context(context_chunks)

    responses = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": f"{formatted_context}\n Query: {data.message}",
                }
            ]
        }
    )

    return responses["messages"][-1].content
