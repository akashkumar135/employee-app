"""Employee Request Validation And Response Transform Schemas"""

from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
    model_validator,
)

from departments.schemas import DepartmentResponse
from employees.validators import validate_postal_code_for_country


class BaseAddressPayload(BaseModel):
    line1: str | None = Field(min_length=1, max_length=100, default=None)
    city: str | None = Field(min_length=1, max_length=50, default=None)
    postal_code: str | None = Field(min_length=1, max_length=10, default=None)
    country: str | None = Field(min_length=1, max_length=20, default=None)

    @field_validator("postal_code")
    @classmethod
    def validate_postal_code(cls, v: str | None) -> str | None:

        if v and not v.isdigit():
            raise ValueError("Postal code must contain only digits (0-9)")

        return v

    # NOTE: This validation will fail if user doesn't provide county but postal_code. Need to move this validation to repo level
    # or make it require country when postal is needed
    @model_validator(mode="after")
    def validate_address(self):
        validate_postal_code_for_country(self.country, self.postal_code)
        return self


class CreateAddressPayload(BaseAddressPayload):
    line1: str = Field(min_length=1, max_length=100)
    city: str = Field(min_length=1, max_length=50)
    postal_code: str = Field(min_length=1, max_length=10)
    country: str = Field(min_length=1, max_length=20)


class UpdateAddressPayload(BaseAddressPayload):
    pass


class CreateEmployeePayload(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    name: str = Field(min_length=1)
    email: EmailStr
    age: int | None = Field(gt=0, lt=150, default=None)
    password: str = Field(min_length=6)
    address: CreateAddressPayload | None = None


class UpdateEmployeePayload(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    name: str | None = Field(min_length=1, default=None)
    email: EmailStr | None = None
    age: int | None = Field(gt=0, lt=150, default=None)


class SearchEmployeeQueryParams(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    name: str | None = None
    email: str | None = None


class BaseAddressResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    line1: str
    city: str
    employee_id: int
    postal_code: str


class AddressResponse(BaseAddressResponse):
    created_at: datetime
    updated_at: datetime


class BaseEmployeeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    age: int | None


class EmployeeResponse(BaseEmployeeResponse):
    created_at: datetime
    updated_at: datetime


class EmployeeWithAddressesAndDepartmentsResponse(EmployeeResponse):
    addresses: list[AddressResponse]
    departments: list[DepartmentResponse]
