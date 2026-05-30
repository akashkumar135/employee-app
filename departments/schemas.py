from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class CreateDepartmentPayload(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    name: str = Field(min_length=1, max_length=20)

    @field_validator("name")
    @classmethod
    def normalize_name(cls, name: str):
        return name.lower()


class UpdateDepartmentPayload(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    name: str | None = Field(min_length=1, max_length=20, default=None)

    @field_validator("name")
    @classmethod
    def normalize_name(cls, name: str | None):
        return name.lower() if name else name


class DepartmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    created_at: datetime
    updated_at: datetime
