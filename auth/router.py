from fastapi import APIRouter, Depends

from auth import service as auth_service
from auth.schemas import LoginRequest, RefreshTokenPayload, TokenResponse
from database import AsyncSession, get_db

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):

    access_token, refresh_token = await auth_service.login(
        db, body.email, body.password
    )

    return TokenResponse(access_token=access_token, refresh_token=refresh_token)


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token_auth(
    payload: RefreshTokenPayload, db: AsyncSession = Depends(get_db)
):

    new_access_token, new_refresh_token = auth_service.refresh_token(
        db, payload.refresh_token
    )

    return TokenResponse(access_token=new_access_token, refresh_token=new_refresh_token)
