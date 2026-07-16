from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import User
from app.models.project import Project
from app.models.task import Task
from app.schemas.dashboard_schema import DashboardResponse

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/", response_model=DashboardResponse)
def dashboard(db: Session = Depends(get_db)):

    total_users = db.query(User).count()

    total_projects = db.query(Project).count()

    total_tasks = db.query(Task).count()

    completed_tasks = db.query(Task).filter(
        Task.status == "Done"
    ).count()

    pending_tasks = db.query(Task).filter(
        Task.status != "Done"
    ).count()

    return {
        "total_users": total_users,
        "total_projects": total_projects,
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks
    }