import asyncio
import os
import sys
from datetime import datetime

# Agregar el directorio app al path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.database.mongodb import get_mongo_client, test_connection
from app.database.postgresql import init_postgres_tables

async def init_sample_data():
    try:
        print("🚀 Inicializando bases de datos...")
        
        # 1. Inicializar PostgreSQL
        print("📊 Inicializando PostgreSQL...")
        await init_postgres_tables()
        
        # 2. Verificar conexión a MongoDB Atlas
        print("☁️  Conectando a MongoDB Atlas...")
        connection_ok = await test_connection()
        
        if connection_ok:
            # 3. Insertar datos de ejemplo en MongoDB
            db = await get_mongo_client()
            
            # Datos de ejemplo para cursos
            sample_courses = [
                {
                    "id": "1",
                    "title": "Introducción a Python",
                    "description": "Aprende los fundamentos de la programación con Python.",
                    "duration": 12,
                    "level": "Principiante",
                    "rating": 4.7,
                    "provider": "Coursera",
                    "tags": ["programación", "python", "básico"],
                    "enrollmentCount": 1500,
                    "createdAt": datetime.now().isoformat()
                },
                {
                    "id": "2",
                    "title": "Cálculo Diferencial",
                    "description": "Domina los conceptos básicos del cálculo diferencial.",
                    "duration": 15,
                    "level": "Intermedio",
                    "rating": 4.5,
                    "provider": "edX",
                    "tags": ["matemáticas", "cálculo", "avanzado"],
                    "enrollmentCount": 890,
                    "createdAt": datetime.now().isoformat()
                },
                {
                    "id": "3",
                    "title": "Machine Learning Básico",
                    "description": "Introducción a los algoritmos de aprendizaje automático.",
                    "duration": 20,
                    "level": "Avanzado",
                    "rating": 4.8,
                    "provider": "Udacity",
                    "tags": ["machine learning", "IA", "avanzado"],
                    "enrollmentCount": 1200,
                    "createdAt": datetime.now().isoformat()
                }
            ]
            
            # Insertar cursos si no existen
            existing_courses = await db["courses"].find().to_list(length=1)
            if not existing_courses:
                await db["courses"].insert_many(sample_courses)
                print("✅ Cursos de ejemplo insertados en MongoDB Atlas")
            else:
                print("ℹ️  Ya existen cursos en la base de datos")
                
        else:
            print("⚠️  Usando datos en memoria para MongoDB")
            
        print("🎉 Inicialización completada exitosamente")
        
    except Exception as e:
        print(f"❌ Error en inicialización: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(init_sample_data())