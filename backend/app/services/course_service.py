from app.database.mongodb import get_mongo_client
from app.models.courses import CourseCreate
from typing import List
import uuid
from datetime import datetime

class CourseService:
    def __init__(self):
        self.collection_name = "courses"
    
    async def get_all_courses(self, skip: int = 0, limit: int = 100):
        db = await get_mongo_client()
        courses = await db[self.collection_name].find().skip(skip).limit(limit).to_list(length=limit)
        return courses
    
    async def get_course(self, course_id: str):
        db = await get_mongo_client()
        course = await db[self.collection_name].find_one({"id": course_id})
        return course
    
    async def search_courses(self, query: str, skip: int = 0, limit: int = 50):
        db = await get_mongo_client()
        
        search_filter = {
            "$or": [
                {"title": {"$regex": query, "$options": "i"}},
                {"description": {"$regex": query, "$options": "i"}},
                {"provider": {"$regex": query, "$options": "i"}},
                {"tags": {"$in": [query]}}
            ]
        }
        
        courses = await db[self.collection_name].find(search_filter).skip(skip).limit(limit).to_list(length=limit)
        return courses
    
    async def create_course(self, course: CourseCreate):
        db = await get_mongo_client()
        
        course_id = str(uuid.uuid4())
        new_course = {
            "id": course_id,
            "title": course.title,
            "description": course.description,
            "duration": course.duration,
            "level": course.level,
            "rating": course.rating,
            "provider": course.provider,
            "tags": course.tags,
            "enrollmentCount": 0,
            "createdAt": datetime.now().isoformat()
        }
        
        result = await db[self.collection_name].insert_one(new_course)
        return new_course