from sqlalchemy import Integer, String, Column, create_engine, DateTime, ForeignKey
from sqlalchemy.orm import Session, declarative_base
from datetime import  datetime,timedelta,timezone
import jwt    
from argon2 import PasswordHasher     
from argon2.exceptions import VerifyMismatchError     

DB_path = "notes.db"
engine = create_engine(f"sqlite:///{DB_path}")
Base = declarative_base()