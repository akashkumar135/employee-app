"""Employee Router"""

from fastapi import APIRouter, Depends, status

from auth.dependencies import get_current_user, require_roles
from auth.schemas import TokenPayload
from database import AsyncSession, get_db
from employees import service
from employees.schemas import (
    AddressResponse,
    BaseEmployeeResponse,
    CreateAddressPayload,
    CreateEmployeePayload,
    EmployeeResponse,
    EmployeeWithAddressesAndDepartmentsResponse,
    SearchEmployeeQueryParams,
    UpdateAddressPayload,
    UpdateEmployeePayload,
)
from models.employee import EmployeeRole

# Contains mainly the routes , parsing logics

router = APIRouter(prefix="/employee", tags=["Employees"])


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
    response_model=EmployeeResponse,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def create_employee(
    body: CreateEmployeePayload, db: AsyncSession = Depends(get_db)
):
    return await service.create_employee(db, body)


@router.get("/search", response_model=list[BaseEmployeeResponse])
async def search_employee(
    query: SearchEmployeeQueryParams = Depends(),
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.search_employee(db, query)


@router.get("", response_model=list[BaseEmployeeResponse])
async def list_employee(
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.list_employee(db)


@router.get("/{id}", response_model=EmployeeWithAddressesAndDepartmentsResponse)
async def get_employee(
    id: int,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.get_employee(db, id)


@router.put(
    "/{id}",
    response_model=EmployeeResponse,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def update_employee(
    id: int,
    body: UpdateEmployeePayload,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.update_employee(db, id, body)


@router.post(
    "/{id}/addresses",
    status_code=status.HTTP_201_CREATED,
    response_model=AddressResponse,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def add_address_employee(
    id: int,
    body: CreateAddressPayload,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.add_address_employee(db, id, body)


@router.put(
    "/{id}/addresses/{address_id}",
    response_model=AddressResponse,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def update_address_employee(
    id: int,
    address_id: int,
    body: UpdateAddressPayload,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.update_address_employee(db, address_id, body)


@router.delete(
    "/{id}/addresses/{address_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def remove_address_employee(
    id: int,
    address_id: int,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.remove_address_employee(db, address_id)


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles(EmployeeRole.HR))],
)
async def delete_employee(
    id: int,
    _current_user: TokenPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.delete_employee(db, id)
