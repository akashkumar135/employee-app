"""Employee Router"""

from fastapi import APIRouter, Body, status, Depends

from database import AsyncSession, get_db

from employees import service
from employees.schemas import EmployeeCreate, EmployeeResponse, EmployeeResponseList

# Contains mainly the routes , parsing logics 

router = APIRouter(prefix="/employee", tags=["Employees"])

@router.post("", status_code=status.HTTP_201_CREATED, response_model=EmployeeResponse)
async def create_employee(body: EmployeeCreate, db: AsyncSession = Depends(get_db)):
    
    employee = await service.create_employee(db, body)

    return employee


@router.get("/search", response_model=list[EmployeeResponse])
async def search_employee(name: str = "", db: AsyncSession = Depends(get_db)):

    employees = await service.search_employee(db, name)

    return employees


@router.get("", response_model=list[EmployeeResponseList])
async def list_employee(db: AsyncSession = Depends(get_db)):

    employees = await service.list_employee(db)

    return employees


@router.get("/{id}", response_model=EmployeeResponse)
async def get_employee_by_id(id: int, db: AsyncSession = Depends(get_db)):

    employee = await service.employee_by_id(db, id)

    return employee

@router.put("/{id}", response_model=EmployeeResponse)
async def update_employee(id: int, body: dict = Body(...), db: AsyncSession = Depends(get_db)):

    updated_employee = await service.update_employee(db, id, body)

    return updated_employee

@router.delete("/{id}", response_model=EmployeeResponse)
async def delete_employee(id: int, db: AsyncSession = Depends(get_db)):

    employee = await service.delete_employee(db, id)

    return employee