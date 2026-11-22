
from fastapi import FastAPI, HTTPException,Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

import functions

app = FastAPI()



# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Request models

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


class NoteRequest(BaseModel):
    title: str
    content: str


# Get logged-in user's ID
def get_current_user(token: str):
    if not token:
        raise HTTPException(status_code=401, detail="Authentication required")
    user_id = functions.verify_token(token)
    if user_id is False:
        raise HTTPException(status_code=401, detail="Invalid or expired access token")
    return user_id



@app.get("/")
def home():
    return {"message": "Personal Notes Manager API is running"}


#  Register user
@app.post("/register", status_code=201)
def register(data: RegisterRequest):

    if not data.username.strip() or not data.password.strip():
        raise HTTPException(status_code=422,detail="Username and password cannot be empty")
    result = functions.register_user(data.username,data.email,data.password)
    if result is False:
        raise HTTPException(status_code=409,detail="Email already exists")
    return result


#  Login user
@app.post("/login")
def login(data: LoginRequest):
    result = functions.verify_login(data.email,data.password)
    if result is False:
        raise HTTPException(status_code=401,detail="Incorrect email or password")
    return result


#  Refresh access token
@app.post("/refresh")
def refresh_token(data: RefreshRequest):

    user_id = functions.verify_refresh_token(data.refresh_token)
    if user_id is False:
        raise HTTPException(status_code=401,detail="Invalid or expired refresh token")
    new_access_token = functions.create_token(user_id=user_id,token_type="access")
    return {"access_token": new_access_token,"token_type": "bearer"}


# E1 - Get logged-in user's notes
@app.get("/notes")
def get_notes(token: str = Header(None)):
    user_id = get_current_user(token)
    notes = functions.get_user_notes(user_id)
    return notes


# E2 - Create a new note
@app.post("/notes", status_code=201)
def add_note(data: NoteRequest, token: str = Header(None)):
    user_id = get_current_user(token)
    if not data.title.strip() or not data.content.strip():
        raise HTTPException(status_code=422, detail="Title and content cannot be empty")
    result = functions.create_note(user_id, data.title, data.content)
    return result