import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

# Configuración de PostgreSQL
POSTGRES_URL = os.getenv("POSTGRES_URL", "postgresql://postgres:kirara@localhost:5432/vilernos")

async def get_postgres_pool():
    try:
        pool = await asyncpg.create_pool(
            POSTGRES_URL,
            min_size=1,
            max_size=10,
            timeout=30,  # ↑ Aumentar timeout
            command_timeout=60  # ↑ Aumentar timeout de comandos
        )
        print("✅ Conectado a PostgreSQL exitosamente")
        return pool
    except Exception as e:
        print(f"❌ Error conectando a PostgreSQL: {e}")
        raise e

async def init_postgres_tables():
    try:
        pool = await get_postgres_pool()
        async with pool.acquire() as connection:
            # Crear tabla de progreso de usuarios
            await connection.execute('''
                CREATE TABLE IF NOT EXISTS user_progress (
                    id SERIAL PRIMARY KEY,
                    user_id VARCHAR(50) NOT NULL,
                    course_id VARCHAR(50) NOT NULL,
                    completed BOOLEAN DEFAULT FALSE,
                    progress_percentage INTEGER DEFAULT 0,
                    score INTEGER,
                    time_studied INTEGER DEFAULT 0,
                    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            print("✅ Tablas de PostgreSQL inicializadas correctamente")
            
    except Exception as e:
        print(f"❌ Error inicializando tablas de PostgreSQL: {e}")