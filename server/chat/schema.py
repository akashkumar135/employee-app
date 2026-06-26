from pydantic import BaseModel, ConfigDict, Field


class ChatFileUploadRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    chat_id: str = Field(min_length=1)


class ChatMessageRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    role: str
    message: str = Field(min_length=1)


# class ChatMessageResponse(BaseModel):
#     model_config = ConfigDict(from_attributes=True)
