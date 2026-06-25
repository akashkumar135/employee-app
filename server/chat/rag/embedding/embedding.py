from chromadb.utils import embedding_functions


def get_embeding_function():
    return embedding_functions.DefaultEmbeddingFunction()


def embed_texts(texts: list[str]) -> list[list[float]]:
    return list(get_embeding_function()(texts))


def embed_query(query: str):
    return get_embeding_function()([query])[0]
