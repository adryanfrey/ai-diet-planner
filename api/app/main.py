from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.apis.plan_diet import router as plan_diet_router

app = FastAPI()

#TODO: Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    plan_diet_router,
    prefix="/api/plan-diet",
    tags=["Plan Diet"],
)