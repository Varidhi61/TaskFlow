from sqlalchemy import Column, Integer, String, Text, ForeignKey, Date
from app.database.connection import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text)
    priority = Column(String(20), default="Medium")
    status = Column(String(30), default="Todo")
    due_date = Column(Date)

    project_id = Column(Integer, ForeignKey("projects.id"))
    assigned_to = Column(Integer, ForeignKey("users.id"))