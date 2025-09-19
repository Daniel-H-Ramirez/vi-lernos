from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import random

router = APIRouter()  # ← ESTA LÍNEA ES CRÍTICA

class Course(BaseModel):
    id: str
    title: str
    description: str
    duration: int
    level: str
    rating: float
    provider: str
    tags: List[str]

class RecommendationRequest(BaseModel):
    user_id: str
    max_recommendations: int = 5

# Cursos de ejemplo
courses_data = [
    {
        "id": "1", 
        "title": "Introducción a Python",
        "description": "Aprende los fundamentos de la programación con Python",
        "duration": 12,
        "level": "Principiante",
        "rating": 4.7,
        "provider": "Coursera",
        "tags": ["programación", "python", "básico"]
    },
    {
        "id": "2", 
        "title": "Cálculo Diferencial",
        "description": "Domina los conceptos básicos del cálculo diferencial",
        "duration": 15,
        "level": "Intermedio", 
        "rating": 4.5,
        "provider": "edX",
        "tags": ["matemáticas", "cálculo", "avanzado"]
    },
    {
        "id": "3", 
        "title": "Machine Learning Básico",
        "description": "Introducción a los algoritmos de aprendizaje automático",
        "duration": 20,
        "level": "Avanzado", 
        "rating": 4.8,
        "provider": "Udacity",
        "tags": ["machine learning", "IA", "avanzado"]
    },
    {
        "id": "4", 
        "title": "Historia del Arte Moderno",
        "description": "Explora los movimientos artísticos del siglo XX",
        "duration": 10,
        "level": "Intermedio", 
        "rating": 4.3,
        "provider": "Khan Academy",
        "tags": ["arte", "historia", "cultura"]
    }
]

@router.get("/recommendations/{user_id}", response_model=List[Course])
async def get_recommendations(user_id: str, max_recommendations: int = 5):
    try:
        # Simular recomendaciones aleatorias (sin scikit-learn)
        recommended_courses = random.sample(courses_data, min(max_recommendations, len(courses_data)))
        return [Course(**course) for course in recommended_courses]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

@router.get("/courses", response_model=List[Course])
async def get_all_courses():
    return [Course(**course) for course in courses_data]

@router.get("/courses/search")
async def search_courses(q: str = ""):
    if not q:
        return courses_data
    
    results = []
    for course in courses_data:
        if (q.lower() in course["title"].lower() or 
            q.lower() in course["description"].lower() or 
            any(q.lower() in tag.lower() for tag in course["tags"])):
            results.append(course)
    
    return results