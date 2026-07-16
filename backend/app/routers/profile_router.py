from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from app.database.connection import get_db
from app.models.user import User
from app.auth.jwt_bearer import get_current_user
from app.schemas.profile_schema import ProfileUpdate
from app.schemas.profile_schema import (
    ProfileUpdate,
    ChangePassword,
)
from app.auth.password_handler import (
    verify_password,
    hash_password,
)
router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.get("/me")
def get_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    user = (
        db.query(User)
        .filter(User.id == current_user["user_id"])
        .first()
    )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
    }
    
@router.put("/me")
def update_profile(
    data: ProfileUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    user = (
        db.query(User)
        .filter(User.id == current_user["user_id"])
        .first()
    )

    user.name = data.name

    user.email = data.email

    db.commit()

    db.refresh(user)

    return {
        "message": "Profile Updated Successfully"
    }    
    
@router.put("/change-password")
def change_password(
    data: ChangePassword,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    user = (
        db.query(User)
        .filter(User.id == current_user["user_id"])
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        data.old_password,
        user.password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Old Password is Incorrect"
        )

    user.password = hash_password(
        data.new_password
    )

    db.commit()

    return {
        "message": "Password Changed Successfully"
    }    