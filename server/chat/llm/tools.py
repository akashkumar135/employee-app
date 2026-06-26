from langchain.tools import tool

from database.connection import get_db
from employees.repo import search


@tool
async def get_employee_by_id(employee_id: str):
    """
    to get the employee details by requested id

    Args:
        employee_id: id of the requested employee
    """

    try:
        async with get_db() as db:
            result = await search(db, {"alternate_id": employee_id})

        return (
            {"name": result[0].name, "status": result[0].status}
            if result is not None
            else f"Employee with id {employee_id} not found"
        )
    except Exception:
        return "Failed to fetch the employee details"
