from pydantic import BaseModel
from datetime import date


class TaskCreate(BaseModel):
    title: str
    description: str
    priority: str
    status: str
    due_date: date
    project_id: int
    assigned_to: int


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    status: str
    due_date: date
    project_id: int
    assigned_to: int

    class Config:
        from_attributes = True