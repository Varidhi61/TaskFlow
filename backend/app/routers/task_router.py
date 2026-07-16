from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.task import Task
from app.schemas.task_schema import TaskCreate

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.post("/")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):

    new_task = Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        status=task.status,
        due_date=task.due_date,
        project_id=task.project_id,
        assigned_to=task.assigned_to
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {"message": "Task Created Successfully"}


@router.get("/")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@router.get("/search/")
def search_tasks(
    keyword: str = Query(...),
    db: Session = Depends(get_db)
):

    return db.query(Task).filter(
        Task.title.ilike(f"%{keyword}%")
    ).all()
@router.get("/status/{status}")
def filter_status(
    status: str,
    db: Session = Depends(get_db)
):

    return db.query(Task).filter(
        Task.status == status
    ).all()  
@router.get("/priority/{priority}")
def filter_priority(
    priority: str,
    db: Session = Depends(get_db)
):

    return db.query(Task).filter(
        Task.priority == priority
    ).all() 
    
@router.get("/kanban/board")
def kanban_board(db: Session = Depends(get_db)):

    return {
        "Todo": db.query(Task).filter(Task.status == "Todo").all(),
        "In Progress": db.query(Task).filter(Task.status == "In Progress").all(),
        "Done": db.query(Task).filter(Task.status == "Done").all()
    }   
@router.get("/kanban/summary")
def kanban_summary(db: Session = Depends(get_db)):

    return {
        "Todo": db.query(Task).filter(Task.status == "Todo").count(),
        "In Progress": db.query(Task).filter(Task.status == "In Progress").count(),
        "Done": db.query(Task).filter(Task.status == "Done").count()
    }    
@router.patch("/{task_id}/status")
def change_task_status(
    task_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = status

    db.commit()
    db.refresh(task)

    return {
        "message": "Task status updated",
        "status": task.status
    }
    
              
@router.get("/{task_id}")
def get_task(task_id: int, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.put("/{task_id}")
def update_task(
    task_id: int,
    task_data: TaskCreate,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.title = task_data.title
    task.description = task_data.description
    task.priority = task_data.priority
    task.status = task_data.status
    task.due_date = task_data.due_date
    task.project_id = task_data.project_id
    task.assigned_to = task_data.assigned_to

    db.commit()
    db.refresh(task)

    return {"message": "Task Updated Successfully"}


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task Deleted Successfully"}
  
