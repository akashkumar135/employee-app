"""Employee Router"""

from fastapi import APIRouter, Body, Depends, status

from auth.dependencies import get_current_user
from auth.schemas import TokenPayload
from database import AsyncSession, get_db
from employees import service
from employees.schemas import (
    CreateAddressPayload,
    CreateEmployeePayload,
    GlobalAddressResponse,
    GlobalEmployeeResponse,
    ListEmployeeResponse,
    SearchEmployeeQueryParams,
    UpdateEmployeePayload,
)

# Contains mainly the routes , parsing logics

router = APIRouter(prefix="/employee", tags=["Employees"])


@router.post(
    "", status_code=status.HTTP_201_CREATED, response_model=GlobalEmployeeResponse
)
async def create_employee(
    body: CreateEmployeePayload, db: AsyncSession = Depends(get_db)
):
    return await service.create_employee(db, body)


@router.get("/search", response_model=list[ListEmployeeResponse])
async def search_employee(
    query: SearchEmployeeQueryParams = Depends(), db: AsyncSession = Depends(get_db)
):
    return await service.search_employee(db, query)


@router.get("", response_model=list[ListEmployeeResponse])
async def list_employee(
    db: AsyncSession = Depends(get_db),
):
    return await service.list_employee(db)


@router.get("/{id}", response_model=GlobalEmployeeResponse)
async def get_employee(id: int, db: AsyncSession = Depends(get_db)):
    return await service.get_employee(db, id)


@router.put("/{id}", response_model=GlobalEmployeeResponse)
async def update_employee(
    id: int, body: UpdateEmployeePayload, db: AsyncSession = Depends(get_db)
):
    return await service.update_employee(db, id, body)


@router.post(
    "/{id}/addresses",
    status_code=status.HTTP_201_CREATED,
    response_model=GlobalAddressResponse,
)
async def add_address_employee(
    id: int, body: CreateAddressPayload, db: AsyncSession = Depends(get_db)
):
    return await service.add_address_employee(db, id, body)


@router.delete("/{id}/addresses/{address_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_address_employee(
    id: int, address_id: int, db: AsyncSession = Depends(get_db)
):
    return await service.remove_address_employee(db, address_id)


@router.delete("/{id}", response_model=GlobalEmployeeResponse)
async def delete_employee(id: int, db: AsyncSession = Depends(get_db)):
    return await service.delete_employee(db, id)
