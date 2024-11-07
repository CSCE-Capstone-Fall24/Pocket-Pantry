from fastapi import FastAPI, Depends

from sqlalchemy.orm import Session
import models
from database import get_db

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/test")
def test_posts(db: Session = Depends(get_db)):

    test = db.query(models.Test).all()

    return test

@app.get("/recipes")
def test_posts(db: Session = Depends(get_db)):

    all_r = db.query(models.Recipes).all()

    return all_r


