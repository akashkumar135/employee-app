from sentence_transformers import SentenceTransformer


def get_embeding_model(model_name: str = "all-MiniLM-L6-v2") -> SentenceTransformer:
    return SentenceTransformer(model_name)


def embed_texts(model: SentenceTransformer, texts: list[str]) -> list[list[float]]:
    return model.encode(texts).tolist()


def embed_query(model: SentenceTransformer, query: str):
    return model.encode(query).tolist()
