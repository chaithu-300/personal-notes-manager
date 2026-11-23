# personal-notes-manager
| Team | Partner 1 | Partner 2 | Partner 3| Project | Live App |
|---|---|---|---|---|---|
| 6 | Aditya | B Chaitanya | siva reddy|[personal-notes-manager](https://github.com/chaithu-300/personal-notes-manager/blob/main/README.md) | http://13.232.121.64:8001/docs |

# Backend Setup and Execution

Open a terminal and navigate to the backend folder.

cd backend

### Create Virtual Environment

python -m venv venv

### Activate Virtual Environment

Windows:

venv\Scripts\activate

### Install libraries
pip install fastapi
            pydantic 
            sqlalchemy 
            pyjwt 
            argon2-cffi 
            uvicorn

### Install Dependencies

pip install -r requirements.txt

### Run Backend

uvicorn main:app --reload --port 8001

Backend URL:

http://127.0.0.1:8001

## 7. Frontend Setup and Execution

Open another terminal.

Navigate to the frontend folder.

cd frontend

### Install Dependencies

npm install

npm create vite@latest -- --template react 

### Run Frontend

npm run dev

Frontend URL:

http://localhost:5173

## 8. Docker Setup and Execution

### Build Docker Image

docker build -t project-name .

### Run Docker Container

docker run -d -p 8001:8001 --name project-container project-name

### Check Running Containers

docker ps

### Stop Container

docker stop project-container

### start container

docker start project-container

### Remove Container

docker rm project-container

API Documentation:

http://127.0.0.1:8001/docs

##  API Requirements

The application must provide APIs for the following. Fill in the API contract for each row.

| # | Description | Method | Endpoint | Path / Query Params | Request Body | Response Body | Status Codes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Register a user | POST |/register |None |user-name, email, password | registered successfully |201, 409, 422 |
| 2 | Login a user | POST|/Login |None | email, password |login successfully, access_token, refresh_token |200, 401 |
| 3 | To validate refresh token |POST |/refresh |None |user_id, token_type | new access token|401 |
| 4 | get all notes of that user | GET| /notes|None | access_token| None|200, 404 |
| 5 | create new notes |POST | /notes|None | access_token|None | 200, 422|

## Datebase Tables

| # | Table | Columns |
| --- | --- | --- |
| 1 | User | `id`, `username`, `email`, `hashed_password`, `created_at` |
| 2 | Notes | `id`, `user_id`, `title`, `content`, `created_at` |
