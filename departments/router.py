from fastapi import APIRouter, Depends, status

from auth.dependencies import get_current_user, require_roles
from auth.schemas import TokenPayload
from database import AsyncSession, get_db
from departments import service as department_service
from departments.schemas import (
    BaseDepartmentResponse,
    CreateDepartmentPayload,
    DepartmentResponse,
    EmployeeXDepartmentResponse,
    SearchDepartmentQueryParams,
    UpdateDepartmentPayload,
)
from models.employee import EmployeeRole

router = APIRouter(prefix="/department", tags=["Departments"])


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
    response_model=DepartmentResponse,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def create_department(
    data: CreateDepartmentPayload,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await department_service.create_department(db, data)


@router.put(
    "/{id}",
    response_model=DepartmentResponse,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def update_department(
    id: int,
    body: UpdateDepartmentPayload,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await department_service.update_department(db, id, body)


@router.get("", response_model=list[BaseDepartmentResponse])
async def list_all_department(
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await department_service.list_department(db)


@router.get("/search", response_model=list[BaseDepartmentResponse])
async def search_departments(
    filters: SearchDepartmentQueryParams = Depends(),
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await department_service.search_department(db, filters)


@router.get("/:id", response_model=DepartmentResponse)
async def get_department(
    id: int,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await department_service.get_department(db, id)


@router.post(
    "/{id}/{employee_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=EmployeeXDepartmentResponse,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def add_employee_to_department(
    id: int,
    employee_id: int,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await department_service.add_employee_to_department(db, id, employee_id)


@router.delete(
    "/{id}/{employee_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def remove_employee_from_department(
    id: int,
    employee_id: int,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await department_service.remove_employee_from_department(db, id, employee_id)
