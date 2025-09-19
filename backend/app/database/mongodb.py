from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# Configuración de MongoDB Atlas
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "vilernos")

async def get_mongo_client():
    try:
        client = AsyncIOMotorClient(MONGODB_URL)
        
        # Verificar conexión a Atlas
        await client.admin.command('ping')
        print("✅ Conectado a MongoDB Atlas exitosamente")
        
        return client[MONGODB_DB_NAME]
        
    except Exception as e:
        print(f"❌ Error conectando a MongoDB Atlas: {e}")
        print(f"URL usada: {MONGODB_URL}")
        raise e

# Función para verificar la conexión (útil para debugging)
async def test_connection():
    try:
        db = await get_mongo_client()
        collections = await db.list_collection_names()
        print(f"✅ Conexión exitosa. Colecciones: {collections}")
        return True
    except Exception as e:
        print(f"❌ Error de conexión: {e}")
        return False