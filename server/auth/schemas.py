from pydantic import BaseModel, ConfigDict, EmailStr


class LoginRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    email: EmailStr
    password: str


class RefreshTokenPayload(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    refresh_token: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    id: int
    email: str
    role: str
