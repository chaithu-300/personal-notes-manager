import os
from datetime import datetime, timedelta
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, create_engine #pyright: ignore
from sqlalchemy.orm import Session, declarative_base #pyright: ignore
import jwt #pyright: ignore
from argon2 import PasswordHasher #pyright: ignore
from argon2.exceptions import VerifyMismatchError #pyright: ignore

ph = PasswordHasher()


DB_URL = os.getenv("DB_URL", "sqlite:///./notes.db")
engine = create_engine(DB_URL)
Base = declarative_base()

ACCESS_TOKEN_EXPIRY = 15  # minutes
REFRESH_TOKEN_EXPIRY = 7 * 24 * 60  # minutes

SECRET_KEY = "SECRET123"
ALGORITHM = "HS256"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.now)


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    content = Column(String)
    created_at = Column(DateTime, default=datetime.now)

Base.metadata.create_all(engine)


def register_user(username, email, password):
    session = Session(engine)

    user_exists = session.query(User).filter_by(email=email).first()

    if user_exists is not None:
        session.close()
        return False

    new_user = User(
        username=username,
        email=email,
        hashed_password=ph.hash(password)
    )

    session.add(new_user)
    session.commit()

    response = {
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "created_at": new_user.created_at
    }

    session.close()
    return response



def verify_login(email, password):
    session = Session(engine)

    user = session.query(User).filter_by(email=email).first()

    if user is None:
        session.close()
        return False

    try:
        ph.verify(str(user.hashed_password), password)
    except VerifyMismatchError:
        session.close()
        return False

    user_id = user.id
    session.close()

    access_token = create_token(user_id=user_id, token_type="access")
    refresh_token = create_token(user_id=user_id, token_type="refresh")

    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }



def create_token(user_id, token_type):
    time = ACCESS_TOKEN_EXPIRY

    if token_type == "refresh":
        time = REFRESH_TOKEN_EXPIRY

    payload = {
        "user_id": user_id,
        "token_type": token_type,
        "exp": datetime.utcnow() + timedelta(minutes=time)
    }

    token = jwt.encode(
        payload=payload,
        key=SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token



def verify_token(token):
    try:
        payload = jwt.decode(
            jwt=token,
            key=SECRET_KEY,
            algorithms=[ALGORITHM]
        )
    except jwt.InvalidTokenError:
        return False

    if payload["token_type"] == "access":
        return payload["user_id"]

    return False


def verify_refresh_token(token):
    try:
        payload = jwt.decode(
            jwt=token,
            key=SECRET_KEY,
            algorithms=[ALGORITHM]
        )
    except jwt.InvalidTokenError:
        return False

    if payload["token_type"] == "refresh":
        return payload["user_id"]

    return False


def get_user_notes(user_id):
    session = Session(engine)

    notes = session.query(Note).filter_by(user_id=user_id).all()

    results = []

    for note in notes:
        results.append({
            "id": note.id,
            "title": note.title,
            "content": note.content,
            "created_at": note.created_at
        })

    session.close()
    return results


def create_note(user_id, title, content):
    session = Session(engine)

    new_note = Note(
        user_id=user_id,
        title=title,
        content=content
    )

    session.add(new_note)
    session.commit()

    response = {
        "id": new_note.id,
        "user_id": new_note.user_id,
        "title": new_note.title,
        "content": new_note.content,
        "created_at": new_note.created_at
    }

    session.close()
    return response

