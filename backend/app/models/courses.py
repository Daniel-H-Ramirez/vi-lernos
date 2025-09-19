from pydantic import BaseModel
from typing import List
from datetime import datetime

class CourseBase(BaseModel):
    title: str
    description: str
    duration: int
    level: str
    rating: float
    provider: str
    tags: List[str]

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: str
    enrollmentCount: int
    createdAt: str

    class Config:
        from_attributes = True