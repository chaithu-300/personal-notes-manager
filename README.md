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