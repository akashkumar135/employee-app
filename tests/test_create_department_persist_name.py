from database.connection import AsyncSession
from departments import service as department_service
from departments.schemas import CreateDepartmentPayload


async def test_create_department_persist_name(db_session: AsyncSession):

    department = CreateDepartmentPayload(name="Engineering")

    new_department = await department_service.create_department(db_session, department)

    assert new_department.id is not None
    assert new_department.name == department.name
