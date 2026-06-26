from chromadb.api import ClientAPI
from fastapi import Request

from vector_db import create_collection


def get_collection(request: Request):

    client: ClientAPI = request.app.state.chroma_client

    return create_collection(client, "documents")
