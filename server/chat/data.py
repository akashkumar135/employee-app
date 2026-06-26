from typing import TypedDict


class ChatMessage(TypedDict):
    id: str
    role: str
    content: str


CONVERSATIONS: dict[str, list[ChatMessage]] = {}
