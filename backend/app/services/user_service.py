from app.database.mongodb import get_mongo_client
from app.models.users import UserCreate, UserUpdate
from passlib.context import CryptContext
from datetime import datetime
import uuid

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    def __init__(self):
        self.collection_name = "users"
    
    async def get_user(self, user_id: str):
        db = await get_mongo_client()
        user = await db[self.collection_name].find_one({"id": user_id})
        return user
    
    async def get_user_by_email(self, email: str):
        db = await get_mongo_client()
        user = await db[self.collection_name].find_one({"email": email})
        return user
    
    async def create_user(self, user: UserCreate):
        db = await get_mongo_client()
        
        # Verificar si el usuario ya existe
        existing_user = await self.get_user_by_email(user.email)
        if existing_user:
            return None
        
        # Crear nuevo usuario
        user_id = str(uuid.uuid4())
        hashed_password = pwd_context.hash(user.password)
        
        new_user = {
            "id": user_id,
            "name": user.name,
            "email": user.email,
            "gender": user.gender,
            "academicLevel": user.academicLevel,
            "interests": user.interests,
            "hashed_password": hashed_password,
            "completedCourses": 0,
            "hoursStudied": 0,
            "achievements": 0,
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        }
        
        result = await db[self.collection_name].insert_one(new_user)
        return new_user
    
    async def update_user(self, user_id: str, user_data: UserUpdate):
        db = await get_mongo_client()
        
        update_data = {
            "name": user_data.name,
            "email": user_data.email,
            "gender": user_data.gender,
            "academicLevel": user_data.academicLevel,
            "interests": user_data.interests,
            "updatedAt": datetime.now()
        }
        
        result = await db[self.collection_name].update_one(
            {"id": user_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 1:
            return await self.get_user(user_id)
        return None
    
    async def verify_password(self, plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)