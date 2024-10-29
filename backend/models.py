from database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text


class Test(Base):
    __tablename__ = "test"

    id = Column(Integer,primary_key=True,nullable=False)