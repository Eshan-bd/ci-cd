import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", json={"username": "test_user", "email": "test_user@example.com"})
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"
    assert response.json()["user"]["username"] == "test_user"

def test_get_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["username"] == "test_user"

