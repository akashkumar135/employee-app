from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from auth.schemas import TokenPayload
from auth.utils import decode_token
from exceptions import UnauthorizedException

oauth2_schema = OAuth2PasswordBearer(
    tokenUrl="/auth/login", refreshUrl="/auth/refresh-token"
)


async def get_current_user(token: str = Depends(oauth2_schema)):

    payload = decode_token(token)

    if payload is None or payload.get("type") != "access_token":
        raise UnauthorizedException("invalid or expired token")

    return TokenPayload(**payload)
