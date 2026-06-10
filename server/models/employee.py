"""
Employee entity — ORM mapped class for table `employees`.
"""

import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.employee_x_department import Employee_X_Department
from models.entity import Entity


class EmployeeRole(str, enum.Enum):
    UI = "UI"
    UX = "UX"
    DEVELOPER = "Developer"
    HR = "HR"


class EmployeeStatus(str, enum.Enum):
    PROBATION = "Probation"
    ACTIVE = "Active"
    INACTIVE = "Inactive"


class Employee(Entity):
    __tablename__ = "employees"

    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    age: Mapped[int] = mapped_column(Integer, nullable=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[EmployeeRole] = mapped_column(
        Enum(
            EmployeeRole,
            name="employeerole",
            values_callable=lambda enum_cls: [e.value for e in enum_cls],
        ),
        nullable=False,
        server_default=EmployeeRole.DEVELOPER.value,
    )
    status: Mapped[str] = mapped_column(
        Enum(
            EmployeeStatus,
            name="employeestatus",
            values_callable=lambda enum_cls: [e.value for e in enum_cls],
        ),
        nullable=False,
        server_default=EmployeeStatus.PROBATION.value,
    )
    experience: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0, server_default="0"
    )
    alternate_id: Mapped[str] = mapped_column(String(20), nullable=False)
    joining_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=True, default=None
    )

    addresses: Mapped[list[Address]] = relationship(
        "Address", back_populates="employee"
    )

    departments: Mapped[list[Department]] = relationship(
        "Department",
        secondary=Employee_X_Department.__table__,
        back_populates="employees",
    )
