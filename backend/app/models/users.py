from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    gender: str
    academicLevel: str
    interests: List[str]

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    pass

class User(UserBase):
    id: str
    completedCourses: int
    hoursStudied: int
    achievements: int
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True