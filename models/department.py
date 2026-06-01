from sqlalchemy import Any, String
from sqlalchemy.dialects.postgresql import CITEXT
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.employee_x_department import Employee_X_Department
from models.entity import Entity, datetime_to_iso


class Department(Entity):
    __tablename__ = "departments"

    name: Mapped[str] = mapped_column(
        CITEXT(20).with_variant(String(20), "sqlite"), nullable=False, unique=True
    )

    employees: Mapped[list["Employee"]] = relationship(
        "Employee",
        secondary=Employee_X_Department.__table__,
        back_populates="departments",
    )

    def to_api_dict(self) -> dict[str, Any]:
        """JSON-friendly representation (ISO 8601 for timestamps)."""
        return {
            "id": self.id,
            "name": self.name,
            "created_at": datetime_to_iso(self.created_at),
            "updated_at": datetime_to_iso(self.updated_at),
            "deleted_at": datetime_to_iso(self.deleted_at),
        }
