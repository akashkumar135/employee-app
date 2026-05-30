
from database import AsyncSession
from employees import repo as employee_repo
from exceptions import UnauthorizedException
from auth.utils import verify_password, create_access_token

async def login(db: AsyncSession, email: str, password: str):

    employee = await employee_repo.find_by_email(db, email)

    if not employee:
        raise UnauthorizedException(detail="Invalid email or password")
    
    if not verify_password(password, employee.password_hash):
        raise UnauthorizedException(detail="Invalid email or password")
    
    return create_access_token({"id": employee.id, "email": employee.email})
    