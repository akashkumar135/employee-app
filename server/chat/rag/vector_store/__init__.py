from chromadb import Collection, PersistentClient
from chromadb.api import ClientAPI


def get_chroma_client(persistant_path: str):
    return PersistentClient(path=persistant_path)


def create_collection(client: ClientAPI, collection_name: str):
    return client.get_or_create_collection(name=collection_name)


def add_chunks(
    collection: Collection, chunks: list[dict[str, str]], embedings: list[list[float]]
):

    chunk_len = len(chunks)

    ids = []
    texts = []
    vectors = []
    metadatas = []

    for index in range(chunk_len):
        chunk = chunks[index]

        texts.append(chunk["text"])
        ids.append(chunk["chunk_id"])
        metadatas.append(chunk["metadata"])
        vectors.append(embedings[index])

    collection.add(ids=ids, documents=texts, embeddings=embedings, metadatas=metadatas)
