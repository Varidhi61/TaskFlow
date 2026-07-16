from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.project import Project
from app.models.task import Task

router = APIRouter(
    prefix="/activity",
    tags=["Activity"],
)


@router.get("/")
def recent_activity(db: Session = Depends(get_db)):

    recent_projects = (
        db.query(Project)
        .order_by(Project.id.desc())
        .limit(5)
        .all()
    )

    recent_tasks = (
        db.query(Task)
        .order_by(Task.id.desc())
        .limit(5)
        .all()
    )

    return {
        "projects": recent_projects,
        "tasks": recent_tasks,
    }