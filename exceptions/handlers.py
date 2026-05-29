import logging
from fastapi import FastAPI, status, Request
from fastapi.responses import JSONResponse
from exceptions import AppException, NotFoundException, ConflictException, BadRequestException

logger = logging.getLogger(__name__)

_STATUS_MAP: dict[type[AppException]] = {
    NotFoundException: status.HTTP_404_NOT_FOUND,
    ConflictException: status.HTTP_409_CONFLICT,
    BadRequestException: status.HTTP_400_BAD_REQUEST
}

def register_exception_handlers(app: FastAPI):  

    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException) -> JSONResponse:
        code = _STATUS_MAP.get(type(exc), status.HTTP_500_INTERNAL_SERVER_ERROR)

        logger.error("%s %s %s", exc.__class__.__name__, code, exc.detail )
        return JSONResponse(status_code=code, content={"detail": exc.detail})
    
    @app.exception_handler(Exception)
    async def unhandled_exceptions_handler(request: Request, exc: AppException) -> JSONResponse:
        code = _STATUS_MAP.get(type(exc), status.HTTP_500_INTERNAL_SERVER_ERROR)

        logger.error("%s %s %s", exc.__class__.__name__, code, exc.detail )
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"detail": "Internal Server Error"})



