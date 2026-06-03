from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from auth.schemas import TokenPayload
from auth.utils import decode_token
from exceptions import ForbiddenException, UnauthorizedException
from models.employee import EmployeeRole

oauth2_schema = OAuth2PasswordBearer(
    tokenUrl="/auth/login", refreshUrl="/auth/refresh-token"
)


async def get_current_user(token: str = Depends(oauth2_schema)):

    payload = decode_token(token)

    if payload is None or payload.get("type") != "access_token":
        raise UnauthorizedException("invalid or expired token")

    return TokenPayload(**payload)


def require_roles(*roles: EmployeeRole):

    def role_checker(_current_user: TokenPayload = Depends(get_current_user)):

        if _current_user.role not in roles:
            raise ForbiddenException(
                detail="You do not have permission to perform this action"
            )

    return role_checker
