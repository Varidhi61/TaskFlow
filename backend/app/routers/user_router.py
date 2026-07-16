from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.auth.password import hash_password
from app.schemas.user_schema import UserLogin
from app.auth.password import verify_password
from app.auth.jwt_handler import create_access_token
from app.schemas.user_schema import UserResponse

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
       
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully"
    }
    
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token(
        {
            "user_id": db_user.id,
            "email": db_user.email,
         
            
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }    
    
  
  
@router.get("/")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()   
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user  
@router.put("/{user_id}")
def update_user(
    user_id: int,
    user_data: UserCreate,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.name = user_data.name
    user.email = user_data.email
    user.password = hash_password(user_data.password)

    db.commit()
    db.refresh(user)

    return {
        "message": "User Updated Successfully"
    }  
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()

    return {
        "message": "User Deleted Successfully"
    }    