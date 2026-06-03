import pytest

from database.connection import AsyncSession
from departments import service as department_service
from exceptions import NotFoundException


async def test_get_by_id_raises_for_unknown_id(db_session: AsyncSession):

    with pytest.raises(NotFoundException) as exp_info:
        await department_service.get_department(db_session, 9999)

    assert "9999" in exp_info.value.detail
