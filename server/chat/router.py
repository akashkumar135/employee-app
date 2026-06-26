from fastapi import APIRouter, File, UploadFile, status
from fastapi.responses import EventSourceResponse

from chat import service as chat_service
from chat.schema import ChatMessageRequest

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post(
    ":id/message",
    status_code=status.HTTP_200_OK,
)
async def chat(id: str, data: ChatMessageRequest):
    return EventSourceResponse(
        chat_service.send_chat_message(id, data), media_type="text/event-stream"
    )


@router.post(":id", status_code=status.HTTP_200_OK)
async def upload_chat_document(id: str, file: UploadFile = File(...)):
    return await chat_service.upload_chat_document(id, file)
