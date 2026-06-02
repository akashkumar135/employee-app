# tests/test_employee_service.py
from auth.utils import hash_password
from employees import service as employee_service
from models.employee import Employee


# The test is now pure "act + assert" — no engine, no create_all, no
# cleanup. Pytest sees the `db_session` parameter, runs the fixture
# above, and hands the yielded session in.
async def test_get_by_id_returns_seeded_employee(db_session):

    # Seed a row directly via the ORM. We construct Employee ourselves
    # (with a real `password_hash`) because service.create currently
    # drops the password field — bypassing it keeps this test focused.
    seeded = Employee(
        name="Ada", email="ada@example.com", password_hash=hash_password("secret123")
    )
    # `add()` is sync — it just stages the row in the session.
    db_session.add(seeded)
    # `commit()` is the IO step. Must be awaited.

    await db_session.commit()

    # `refresh()` re-reads the row so `seeded.id` is populated.

    await db_session.refresh(seeded)

    # Call the function under test — async, so we await.

    fetched = await employee_service.delete_employee(db_session, seeded.id)

    assert fetched.id == seeded.id
    assert fetched.email == "ada@example.com"
