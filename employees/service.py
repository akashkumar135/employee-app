""" Employee Service"""

from exceptions import NotFoundException
from database import AsyncSession
from models.employee import Employee
from employees.repo import create, search, find_all, find_by_id, update_by_id, delete_by_id
# Mainly manage business logics
from auth.utils import hash_password
from employees.schemas import CreateEmployeePayload


async def create_employee(db: AsyncSession, data: CreateEmployeePayload) -> Employee:

    data_dict = data.model_dump()
    hashed_password = hash_password(data.password)
    data_dict.pop("password")
    data_dict["password_hash"] = hashed_password

    employee = await create(db, data_dict)

    return employee

async def list_employee(db: AsyncSession) -> list[Employee]:
    return await find_all(db)

async def search_employee(db: AsyncSession, name: str) -> list[Employee]:

    if name is not None:
        name = name.strip()
    
    return await search(db, name)


async def get_employee(db: AsyncSession, id: int) -> Employee:
    
    employee = await find_by_id(db, id)

    if employee is None:
        raise NotFoundException(detail=f"Employee with id {id} not found")
    
    return employee

async def update_employee(db: AsyncSession, id: int, updated_data: dict) -> Employee:
    return await update_by_id(db, id, updated_data=updated_data)


async def delete_employee(db: AsyncSession, id: int):
    return await delete_by_id(db, id)