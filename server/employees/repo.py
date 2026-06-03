"""Employee Repo"""

from datetime import datetime
from typing import Any

from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy.orm import selectinload, with_loader_criteria

from database import AsyncSession
from exceptions import ConflictException, NotFoundException
from models.address import Address
from models.department import Department
from models.employee import Employee

# Manages only db related queries and return exact response


_employee_stnt = select(Employee)
_address_stnt = select(Address)


async def create(db: AsyncSession, employee: dict[str, Any]) -> Employee:

    data = employee.copy()
    address = data.pop("address")

    db_employee = Employee(**data)

    if address is not None:
        db_address = Address(**address)
        db_employee.addresses.append(db_address)

    db.add(db_employee)

    try:
        await db.commit()

        await db.refresh(db_employee)

        return db_employee

    except IntegrityError:
        await db.rollback()

        raise ConflictException(
            detail=f"Email '{data.get('email').strip()}' is already in use"
        )


async def search(
    db: AsyncSession, filters: dict[str, str | int | float] = None
) -> list[Employee]:

    stnt = _employee_stnt.where(Employee.deleted_at.is_(None))

    if filters:
        if filters.get("name"):
            stnt = stnt.where(Employee.name.ilike(f"%{filters.get('name')}%"))

        if filters.get("role"):
            stnt = stnt.where(Employee.role == filters.get("role"))

    results = await db.scalars(stnt)

    return results


async def find_all(db: AsyncSession) -> list[Employee]:

    stnt = _employee_stnt.where(Employee.deleted_at.is_(None))

    results = await db.scalars(stnt)

    return results


async def find_by_id(db: AsyncSession, id: int) -> Employee:

    stnt = _employee_stnt.where(Employee.id == id, Employee.deleted_at.is_(None))

    try:
        return (await db.execute(stnt)).scalar_one()
    except NoResultFound:
        raise NotFoundException(detail=f"employee with id {id} not found")


async def find_by_id_with_addresses_and_departments(
    db: AsyncSession, id: int
) -> Employee:

    stnt = _employee_stnt.options(
        selectinload(
            Employee.addresses,
        ),
        selectinload(
            Employee.departments,
        ),
        with_loader_criteria(Address, Address.deleted_at.is_(None)),
        with_loader_criteria(Department, Department.deleted_at.is_(None)),
    ).where(Employee.id == id, Employee.deleted_at.is_(None))

    return await db.scalar(stnt)


async def find_by_email(db: AsyncSession, email: str) -> Employee:

    stnt = _employee_stnt.where(Employee.email == email, Employee.deleted_at.is_(None))

    return await db.scalar(stnt)


async def update_by_id(db: AsyncSession, id: int, updated_data: dict[str, Any]):

    if not updated_data:
        return await find_by_id(db, id)

    stnt = (
        update(Employee)
        .where(Employee.id == id, Employee.deleted_at.is_(None))
        .values(**updated_data)
        .returning(Employee)
    )

    try:
        updated_employee = (await db.execute(stnt)).scalar_one()
        await db.commit()

    except IntegrityError:
        await db.rollback()
        raise ConflictException(
            detail=f"Email '{updated_data.get('email')}' is already in use"
        )
    except NoResultFound:
        raise NotFoundException(detail=f"user with id {id} not found")

    return updated_employee


async def delete_by_id(db: AsyncSession, id: int):

    stnt = (
        update(Employee)
        .where(Employee.id == id, Employee.deleted_at.is_(None))
        .values(deleted_at=datetime.now())
        .returning(Employee)
    )

    try:
        deleted_employee = (await db.execute(stnt)).scalar_one()
        await db.commit()

    except NoResultFound:
        raise NotFoundException(
            detail=f"user with id {id} not found or has already deleted"
        )

    return deleted_employee


async def add_address(db: AsyncSession, id: int, data: dict[str, Any]):

    employee = await find_by_id(db, id)

    if employee is None:
        raise NotFoundException(detail=f"employee with id {id} not found")

    db_address = Address(**data, employee_id=employee.id)

    db.add(db_address)

    await db.commit()

    await db.refresh(db_address)

    return db_address


async def find_address_by_id(db: AsyncSession, address_id: int):

    stnt = _address_stnt.where(Address.id == address_id, Address.deleted_at.is_(None))

    try:
        return (await db.execute(stnt)).scalar_one()
    except NoResultFound:
        raise NotFoundException(detail=f"address with id {address_id} not found")


async def update_address(
    db: AsyncSession, address_id: int, data: dict[str, Any]
) -> Address:

    if not data:
        return await find_address_by_id(db, address_id)

    stnt = (
        update(Address)
        .where(Address.id == address_id, Address.deleted_at.is_(None))
        .values(**data)
        .returning(Address)
    )

    try:
        updated_address = (await db.execute(stnt)).scalar_one()
        await db.commit()
    except NoResultFound:
        raise NotFoundException(detail=f"address with id {address_id} not found")

    return updated_address


async def remove_address(db: AsyncSession, address_id: int):

    stnt = (
        update(Address)
        .where(Address.id == address_id, Address.deleted_at.is_(None))
        .values(deleted_at=datetime.now())
        .returning(Address)
    )

    try:
        (await db.execute(stnt)).scalar_one()
        await db.commit()
    except NoResultFound:
        raise NotFoundException(
            detail=f"address with id {address_id} not found or had already deleted"
        )
