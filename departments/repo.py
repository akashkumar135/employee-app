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


async def update_by_id(db: AsyncSession, id, data: dict) -> Department:

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
        raise ConflictException(
            detail=f"{data.get('name') or 'department'} already exist"
        )
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


async def remove_employee(
    db: AsyncSession, id: int, employee_id: int
) -> Employee_X_Department:

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
        updated_employee_x_department = (await db.execute(stnt)).scalar_one()
        await db.commit()

    except NoResultFound:
        raise NotFoundException(
            detail=f"employee with id {employee_id} is not an active member of department with id {id}"
        )

    return updated_employee_x_department
