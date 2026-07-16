from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.project import Project
from app.schemas.project_schema import ProjectCreate
from app.models.task import Task
router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.post("/")
def create_project(project: ProjectCreate,
                   db: Session = Depends(get_db)):

    new_project = Project(
        name=project.name,
        description=project.description
    )

    db.add(new_project)

    db.commit()

    db.refresh(new_project)

    return {
        "message": "Project Created Successfully"
    }
    
@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return projects
  
@router.get("/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project      
  
  
@router.put("/{project_id}")
def update_project(
    project_id: int,
    project_data: ProjectCreate,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.name = project_data.name
    project.description = project_data.description

    db.commit()
    db.refresh(project)

    return {
        "message": "Project Updated Successfully"
    }  
    
@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):

    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Delete all tasks of this project first
    db.query(Task).filter(Task.project_id == project_id).delete()

    # Delete project
    db.delete(project)

    db.commit()

    return {
        "message": "Project Deleted Successfully"
    }