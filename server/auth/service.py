import logging

from auth.utils import (
    create_access_token,
    create_refresh_token,
    decode_token,
    verify_password,
)
from database import AsyncSession
from employees import repo as employee_repo
from exceptions import UnauthorizedException

logger = logging.getLogger(__name__)


async def login(db: AsyncSession, email: str, password: str) -> tuple[str, str]:

    employee = await employee_repo.find_by_email(db, email)

    if not employee:
        raise UnauthorizedException(detail="Invalid email or password")

    if not verify_password(password, employee.password_hash):
        logger.info(f"user {email} unauthorized due to wrong password")
        raise UnauthorizedException(detail="Invalid email or password")

    payload = {"id": employee.id, "email": employee.email, "role": employee.role}
    access_token = create_access_token(payload)
    refresh_token = create_refresh_token(payload)

    return access_token, refresh_token


def refresh_token(db: AsyncSession, refresh_token: str) -> tuple[str, str]:

    payload = decode_token(refresh_token)

    if not payload or payload.get("type") != "refresh_token":
        raise UnauthorizedException(
            detail="Invalid or expired refresh token, needs to reauthenticate"
        )

    new_payload = {
        "id": payload.get("id"),
        "email": payload.get("email"),
        "role": payload.get("role"),
    }

    new_access_token = create_access_token(new_payload)
    new_refresh_token = create_refresh_token(new_payload)

    return new_access_token, new_refresh_token
