from fastapi import APIRouter, HTTPException
from app.services.user_service import UserService
from app.models.users import User, UserCreate, UserUpdate
from typing import List

router = APIRouter()
user_service = UserService()

@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = await user_service.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.post("/users", response_model=User)
async def create_user(user: UserCreate):
    new_user = await user_service.create_user(user)
    if not new_user:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    return new_user

@router.put("/users/{user_id}", response_model=User)
async def update_user(user_id: str, user: UserUpdate):
    updated_user = await user_service.update_user(user_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return updated_user

@router.get("/users", response_model=List[User])
async def get_all_users(skip: int = 0, limit: int = 100):
    # Nota: En producción, agregar autenticación y autorización
    users = await user_service.get_all_users(skip, limit)
    return users