from fastapi import APIRouter, File, UploadFile, status

from chat import service as chat_service
from chat.schema import ChatMessageRequest

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post(
    ":id/message",
    status_code=status.HTTP_200_OK,
)
async def chat(id: str, data: ChatMessageRequest):
    return await chat_service.send_chat_message(id, data)


@router.post(":id", status_code=status.HTTP_200_OK)
async def upload_chat_document(id: str, file: UploadFile = File(...)):
    print(id, file, "FROM LOGGING")
    return await chat_service.upload_chat_document(id, file)
