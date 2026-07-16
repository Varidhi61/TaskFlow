from fastapi import Depends, HTTPException
from jose import jwt

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY = "taskflow_secret_key"
ALGORITHM = "HS256"

security = HTTPBearer()


def admin_required(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )

    if payload["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )

    return payload