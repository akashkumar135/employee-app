from database import AsyncSession
from departments.repo import (
    add_employee,
    create,
    find_all,
    find_by_id,
    remove_employee,
    search,
    update_by_id,
)
from departments.schemas import (
    CreateDepartmentPayload,
    SearchDepartmentQueryParams,
    UpdateDepartmentPayload,
)
from models.department import Department


async def create_department(
    db: AsyncSession, data: CreateDepartmentPayload
) -> Department:
    return await create(db, data.model_dump())


async def update_department(
    db: AsyncSession, id: int, data: UpdateDepartmentPayload
) -> Department:
    return await update_by_id(db, id, data.model_dump(exclude_none=True))


async def list_department(db: AsyncSession):
    return await find_all(db)


async def get_department(db: AsyncSession, id: int):
    return await find_by_id(db, id)


async def search_department(db: AsyncSession, filters: SearchDepartmentQueryParams):
    return await search(db, filters.model_dump(exclude_none=True))


async def add_employee_to_department(db: AsyncSession, id: int, employee_id: int):
    return await add_employee(db, id, employee_id)


async def remove_employee_from_department(db: AsyncSession, id: int, employee_id: int):
    await remove_employee(db, id, employee_id)
