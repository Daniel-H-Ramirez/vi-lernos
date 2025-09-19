from fastapi import APIRouter, HTTPException
from app.services.course_service import CourseService
from app.models.courses import Course
from typing import List

router = APIRouter()
course_service = CourseService()

@router.get("/courses", response_model=List[Course])
async def get_all_courses(skip: int = 0, limit: int = 100):
    courses = await course_service.get_all_courses(skip, limit)
    return courses

@router.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    course = await course_service.get_course(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Curso no encontrado")
    return course

@router.get("/courses/search")
async def search_courses(q: str = "", skip: int = 0, limit: int = 50):
    if not q:
        courses = await course_service.get_all_courses(skip, limit)
        return courses
    
    courses = await course_service.search_courses(q, skip, limit)
    return courses

@router.get("/recommendations/{user_id}", response_model=List[Course])
async def get_recommendations(user_id: str, max_recommendations: int = 5):
    try:
        # Para simplificar, devolvemos cursos aleatorios
        # En producción, aquí iría la lógica de recomendación real
        all_courses = await course_service.get_all_courses()
        import random
        recommended = random.sample(all_courses, min(max_recommendations, len(all_courses)))
        return recommended
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando recomendaciones: {str(e)}")