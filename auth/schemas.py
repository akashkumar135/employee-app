

from pydantic import ConfigDict, BaseModel, EmailStr, Field

class LoginRequest(BaseModel):
    
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    email: EmailStr
    password: str

class TokenResponse(BaseModel):

    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):

    id: int
    email: str