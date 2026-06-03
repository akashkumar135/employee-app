from datetime import datetime
from typing import Any

from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError, NoResultFound

from database import AsyncSession
from exceptions import ConflictException, NotFoundException
from models.department import Department
from models.employee_x_department import Employee_X_Department


async def create(db: AsyncSession, data: dict[str, Any]) -> Department:

    department = Department(**data)

    db.add(department)

    try:
        await db.commit()

    except IntegrityError:
        await db.rollback()
        raise ConflictException(detail=f"{data.get('name')} already exist")

    await db.refresh(department)

    return department


async def find_all(db: AsyncSession) -> list[Department]:

    stnt = select(Department).where(Department.deleted_at.is_(None))

    return (await db.execute(stnt)).scalars()


async def search(db: AsyncSession, filters: dict[str, Any] = None):

    stnt = select(Department).where(Department.deleted_at.is_(None))
    print(filters)
    if filters:
        if filters.get("name"):
            stnt = stnt.where(Department.name.ilike(f"%{filters.get('name')}%"))

    return await db.scalars(stnt)


async def find_by_id(db: AsyncSession, id: int) -> list[Department]:

    stnt = select(Department).where(
        Department.id == id, Department.deleted_at.is_(None)
    )

    try:
        return (await db.execute(stnt)).scalar_one()
    except NoResultFound:
        raise NotFoundException(detail=f"department with id {id} not found")


async def update_by_id(db: AsyncSession, id, data: dict[str, Any]) -> Department:

    if not data:
        return await find_by_id(db, id)

    stnt = (
        update(Department)
        .where(Department.id == id, Department.deleted_at.is_(None))
        .values(**data)
        .returning(Department)
    )

    try:
        updated_department = (await db.execute(stnt)).scalar_one()
        await db.commit()

    except IntegrityError:
        raise ConflictException(detail=f"{data.get('name')} already exist")
    except NoResultFound:
        raise NotFoundException(detail=f"department with id {id} not found")

    return updated_department


async def add_employee(
    db: AsyncSession, id: int, employee_id: int
) -> Employee_X_Department:

    employee_x_department = Employee_X_Department(
        department_id=id, employee_id=employee_id
    )

    db.add(employee_x_department)

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise ConflictException(
            detail=f"employee with id {employee_id} already exist in the department"
        )

    await db.refresh(employee_x_department)
    return employee_x_department


async def remove_employee(db: AsyncSession, id: int, employee_id: int):

    stnt = (
        update(Employee_X_Department)
        .where(
            Employee_X_Department.department_id == id,
            Employee_X_Department.employee_id == employee_id,
            Employee_X_Department.deleted_at.is_(None),
        )
        .values(deleted_at=datetime.now())
        .returning(Employee_X_Department)
    )

    try:
        (await db.execute(stnt)).scalar_one()
        await db.commit()

    except NoResultFound:
        raise NotFoundException(
            detail=f"employee with id {employee_id} is not an active member of department with id {id}"
        )
