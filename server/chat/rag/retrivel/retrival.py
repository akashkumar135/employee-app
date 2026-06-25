from typing import Any

from chromadb import Collection


def retrive_chunks(
    collection: Collection, query_embeded: str, n_results: int = 5
) -> list[dict[str, Any]]:

    response = collection.query([query_embeded], n_results=n_results)

    formatted_response = {
        "ids": response["ids"][0],
        "documents": response["documents"][0],
        "metadatas": response["metadatas"][0],
        "distances": response["distances"][0],
    }

    results = []
    results_len = len(formatted_response["ids"])

    for index in range(results_len):
        results.append(
            {
                "chunk_id": formatted_response["ids"][index],
                "text": formatted_response["documents"][index],
                "metadata": response["metadatas"][index],
                "distance": formatted_response["distances"][index],
            }
        )

    return results


def format_context(chunks: list[dict[str, Any]]) -> str:

    context = ""

    for chunk in chunks:
        context = context + f"[\n{chunk['text']}\n\n"

    return context
