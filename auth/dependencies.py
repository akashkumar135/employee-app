


from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from auth.schemas import TokenPayload
from auth.utils import decode_access_token
from exceptions import UnauthorizedException

oauth2_schema = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(token: str = Depends(oauth2_schema)):

    payload = decode_access_token(token)

    if payload is None:
        raise UnauthorizedException("invalid or expired token")
    
    return TokenPayload(**payload)