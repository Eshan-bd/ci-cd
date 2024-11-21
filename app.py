from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from typing import List

app = FastAPI()

# In-memory storage (for simplicity)
users_db = []


class User(BaseModel):
    username: str
    email: str


@app.post("/users/")
async def create_user(user: User):
    users_db.append(user)
    return {"message": "User created successfully", "user": user}


@app.get("/users/", response_model=List[User])
async def get_users():
    return users_db
