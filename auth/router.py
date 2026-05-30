
from fastapi import APIRouter, Depends
from database import AsyncSession, get_db
from auth import service as auth_service
from auth.schemas import LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    
    token = await auth_service.login(db, body.email, body.password)

    return TokenResponse(access_token=token)

