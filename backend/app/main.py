from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.database.connection import Base, engine
from app.routers.project_router import router as project_router
import app.models.user
import app.models.project
import app.models.task
from app.routers.task_router import router as task_router
from app.routers.user_router import router as user_router
from app.routers.dashboard_router import router as dashboard_router
from app.routers.admin_router import router as admin_router
from app.routers.profile_router import router as profile_router
from app.routers.activity_router import router as activity_router
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://task-flow-yt1h.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router)
app.include_router(project_router)
app.include_router(task_router)
app.include_router(dashboard_router)
app.include_router(admin_router)
app.include_router(profile_router)
app.include_router(activity_router)
@app.get("/")
def root():
    return {
        "message": "TaskFlow Backend Running Successfully"
    }