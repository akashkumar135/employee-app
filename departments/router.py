from fastapi import APIRouter, Depends, status

from database import AsyncSession, get_db
from departments import service as department_service
from departments.schemas import (
    BaseDepartmentResponse,
    CreateDepartmentPayload,
    DepartmentResponse,
    EmployeeXDepartmentResponse,
    UpdateDepartmentPayload,
)

router = APIRouter(prefix="/department", tags=["Departments"])


@router.post("", status_code=status.HTTP_201_CREATED, response_model=DepartmentResponse)
async def create_department(
    data: CreateDepartmentPayload, db: AsyncSession = Depends(get_db)
):
    return await department_service.create_department(db, data)


@router.put("/{id}", response_model=DepartmentResponse)
async def update_department(
    id: int, body: UpdateDepartmentPayload, db: AsyncSession = Depends(get_db)
):
    return await department_service.update_department(db, id, body)


@router.get("", response_model=list[BaseDepartmentResponse])
async def list_all_department(db: AsyncSession = Depends(get_db)):
    return await department_service.list_department(db)


@router.post(
    "/{id}/{employee_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=EmployeeXDepartmentResponse,
)
async def add_employee_to_department(
    id: int, employee_id: int, db: AsyncSession = Depends(get_db)
):
    return await department_service.add_employee_to_department(db, id, employee_id)


@router.delete("/{id}/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_employee_from_department(
    id: int, employee_id: int, db: AsyncSession = Depends(get_db)
):
    await department_service.remove_employee_from_department(db, id, employee_id)
