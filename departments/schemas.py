from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CreateDepartmentPayload(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    name: str = Field(min_length=1, max_length=20)


class UpdateDepartmentPayload(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")

    name: str | None = Field(min_length=1, max_length=20, default=None)


class DepartmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    created_at: datetime
    updated_at: datetime
