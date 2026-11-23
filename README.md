# personal-notes-manager
# Backend Setup and Execution

Open a terminal and navigate to the backend folder.

cd backend

### Create Virtual Environment

python -m venv venv

### Activate Virtual Environment

Windows:

venv\Scripts\activate

Linux / macOS:

source venv/bin/activate

### Install Dependencies

pip install -r requirements.txt

### Run Backend

uvicorn main:app --reload --port 8001

Backend URL:

http://127.0.0.1:8001

API Documentation:

http://127.0.0.1:8001/docs
