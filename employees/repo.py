"""Employee Repo"""

from datetime import datetime
from typing import Any

from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError, NoResultFound

from database import AsyncSession
from exceptions import ConflictException, NotFoundException
from models.address import Address
from models.employee import Employee

# Manages only db related queries and return exact response


_employee_stnt = select(Employee)


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
    db: AsyncSession, filters: dict[str, str | int | float] = {}
) -> list[Employee]:

    stnt = _employee_stnt.where(Employee.deleted_at.is_(None))

    if filters.get("name"):
        stnt = stnt.where(Employee.name.ilike(f"%{filters.get('name')}%"))

    results = await db.scalars(stnt)

    return results


async def find_all(db: AsyncSession) -> list[Employee]:

    stnt = _employee_stnt.where(Employee.deleted_at.is_(None))

    results = await db.scalars(stnt)

    return results


async def find_by_id(db: AsyncSession, id: int) -> Employee:

    stnt = _employee_stnt.where(Employee.id == id, Employee.deleted_at.is_(None))

    return await db.scalar(stnt)


async def find_by_email(db: AsyncSession, email: str) -> Employee:

    stnt = _employee_stnt.where(Employee.email == email, Employee.deleted_at.is_(None))

    return await db.scalar(stnt)


async def update_by_id(db: AsyncSession, id: int, updated_data: dict):

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
        raise NotFoundException(detail=f"user not found")

    return updated_employee


async def delete_by_id(db: AsyncSession, id: int):

    stnt = (
        update(Employee)
        .where(Employee.id == id, Employee.deleted_at.is_(None))
        .values(deleted_at=datetime.now())
        .returning(Employee)
    )

    try:
        updated_employee = (await db.execute(stnt)).scalar_one()
        await db.commit()

    except NoResultFound:
        raise NotFoundException(
            detail=f"user with id {id} not found or has already deleted"
        )

    return updated_employee
