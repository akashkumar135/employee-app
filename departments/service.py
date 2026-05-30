from database import AsyncSession
from departments.repo import (
    add_employee,
    create,
    find_all,
    remove_employee,
    update_by_id,
)
from departments.schemas import CreateDepartmentPayload
from models.department import Department


async def create_department(
    db: AsyncSession, data: CreateDepartmentPayload
) -> Department:
    return await create(db, data.model_dump())


async def update_department(db: AsyncSession, id: int, data: dict) -> Department:

    valid_datas = {}

    if data is not None and data.get("name"):
        name = data.get("name")
        if isinstance(name, str):
            valid_datas["name"] = name.strip()

    return await update_by_id(db, id, valid_datas)


async def list_department(db: AsyncSession):
    return await find_all(db)


async def add_employee_to_department(db: AsyncSession, id: int, employee_id: int):
    return await add_employee(db, id, employee_id)


async def remove_employee_from_department(db: AsyncSession, id: int, employee_id: int):
    return await remove_employee(db, id, employee_id)
