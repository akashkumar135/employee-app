"""Employee Repo"""

from datetime import datetime

from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy import select, update

from exceptions import NotFoundException, ConflictException
from database import AsyncSession
from models.employee import Employee


# Manages only db related queries and return exact response


async def create(db: AsyncSession, employee) -> Employee:

    data = employee
    address = data.pop("address")

    db_employee = Employee(**data)

    db.add(db_employee)

    try:
        await db.commit()

    except IntegrityError:
        await db.rollback()
        raise ConflictException(detail=f"Email '{data.get("email").strip()}' is already in use")
        

    await db.refresh(db_employee)

    return db_employee

async def search(db: AsyncSession, name: str | None) -> list[Employee]:
    
    stnt = select(Employee).where(Employee.deleted_at.is_(None))

    if name is not None and name:
        stnt = stnt.where(Employee.name.ilike(f"%{name}%"))

    results = await db.scalars(stnt)

    return results

async def find_all(db: AsyncSession) -> list[Employee]:
    
    stnt = select(Employee).where(Employee.deleted_at.is_(None))

    results = await db.scalars(stnt)

    return results

async def find_by_id(db: AsyncSession, id: int) -> Employee:
    
    stnt = select(Employee).where(Employee.id == id)

    return await db.scalar(stnt)

async def find_by_email(db: AsyncSession, email: str) -> Employee:
    
    stnt = select(Employee).where(Employee.email == email, Employee.deleted_at.is_(None))

    return await db.scalar(stnt)



async def update_by_id(db: AsyncSession, id: int, updated_data: dict):

    stnt = update(Employee).where(Employee.id == id, Employee.deleted_at.is_(None)).values(**updated_data).returning(Employee)

    try:

        updated_employee  = (await db.execute(stnt)).scalar_one()
        await db.commit()

    except IntegrityError:
        await db.rollback()
        raise ConflictException(detail=f"Email '{updated_data.get("email")}' is already in use")
    except NoResultFound:
        raise NotFoundException(detail=f"user not found")
    
    return updated_employee

async def delete_by_id(db: AsyncSession, id: int):

    stnt = update(Employee).where(Employee.id == id, Employee.deleted_at.is_(None)).values(deleted_at=datetime.now()).returning(Employee)

    try:
        updated_employee = (await db.execute(stnt)).scalar_one()
        await db.commit()

    except NoResultFound:
        raise NotFoundException(detail=f"user with id {id} not found or has already deleted")
    
    return updated_employee
