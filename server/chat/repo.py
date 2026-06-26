from chat.data import CONVERSATIONS, ChatMessage
from chat.rag.retrivel import retrival
from vector_db import add_chunks, create_collection, get_chroma_client


def create_or_get(chat_id: str):

    chat = CONVERSATIONS.get(chat_id, None)

    if chat is None:
        CONVERSATIONS[chat_id] = []
        chat = []

    return chat


def add_message(chat_id: str, message: ChatMessage):

    create_or_get(chat_id)

    CONVERSATIONS[chat_id].append(message)

    return CONVERSATIONS[chat_id]


def add_document_chunks(chunks: list[dict[str, str]], embedings: list[list[float]]):

    client = get_chroma_client("./chromadb")

    collection = create_collection(client, "chat_documents")

    add_chunks(collection, chunks, embedings)


def find_related_chunks(id: str, embedded_query: list[float]):

    client = get_chroma_client("./chromadb")

    collection = create_collection(client, "chat_documents")

    return retrival.retrive_chunks(collection, id, embedded_query)
