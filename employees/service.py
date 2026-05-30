"""Employee Service"""

# Mainly manage business logics
from auth.utils import hash_password
from database import AsyncSession
from employees.repo import (
    add_address,
    create,
    delete_by_id,
    find_all,
    find_by_id_with_addresses_and_departments,
    remove_address,
    search,
    update_by_id,
)
from employees.schemas import (
    CreateAddressPayload,
    CreateEmployeePayload,
    SearchEmployeeQueryParams,
    UpdateEmployeePayload,
)
from exceptions import NotFoundException
from models.address import Address
from models.employee import Employee


async def create_employee(db: AsyncSession, data: CreateEmployeePayload):

    data_dict = data.model_dump()

    hashed_password = hash_password(data.password)

    data_dict.pop("password")
    data_dict["password_hash"] = hashed_password

    employee = await create(db, data_dict)

    return employee


async def list_employee(db: AsyncSession) -> list[Employee]:
    return await find_all(db)


async def search_employee(
    db: AsyncSession, filters: SearchEmployeeQueryParams
) -> list[Employee]:
    return await search(db, filters.model_dump())


async def get_employee(db: AsyncSession, id: int) -> Employee:

    employee = await find_by_id_with_addresses_and_departments(db, id)

    if employee is None:
        raise NotFoundException(detail=f"Employee with id {id} not found")

    return employee


async def update_employee(
    db: AsyncSession, id: int, updated_data: UpdateEmployeePayload
) -> Employee:
    return await update_by_id(db, id, updated_data.model_dump())


async def delete_employee(db: AsyncSession, id: int):
    return await delete_by_id(db, id)


async def add_address_employee(
    db: AsyncSession, id: int, data: CreateAddressPayload
) -> Address:
    return await add_address(db, id, data.model_dump())


async def remove_address_employee(db: AsyncSession, address_id: int):
    await remove_address(db, address_id)
