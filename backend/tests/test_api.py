import pytest


def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "GROWWW" in data["service"]


def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"
    assert data["version"] == "1.0.0"


def test_get_faqs(client):
    response = client.get("/api/v1/faqs")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 15
    assert len(data["items"]) == 15
    assert data["items"][0]["question"] == "What is a SIP?"


def test_get_faqs_filter_category(client):
    response = client.get("/api/v1/faqs?category=Basics")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] > 0
    for item in data["items"]:
        assert item["category"] == "Basics"


def test_get_faq_by_id(client):
    response = client.get("/api/v1/faqs/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert "SIP" in data["question"]


def test_get_faq_not_found(client):
    response = client.get("/api/v1/faqs/99999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_search_faqs(client):
    response = client.get("/api/v1/faqs/search?q=mandate")
    assert response.status_code == 200
    items = response.json()
    assert len(items) > 0
    assert any("mandate" in f["question"].lower() or "mandate" in f["answer"].lower() for f in items)


def test_get_learning_modules(client):
    response = client.get("/api/v1/learning/modules")
    assert response.status_code == 200
    items = response.json()
    assert len(items) == 10
    slugs = [m["slug"] for m in items]
    assert "understanding-money-and-investing" in slugs
    assert "investor-safety" in slugs


def test_get_learning_module_detail(client):
    response = client.get("/api/v1/learning/modules/understanding-money-and-investing")
    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == "understanding-money-and-investing"
    assert len(data["lessons"]) >= 1


def test_get_learning_module_not_found(client):
    response = client.get("/api/v1/learning/modules/non-existent-slug")
    assert response.status_code == 404


def test_get_journey_stages(client):
    response = client.get("/api/v1/journey/stages")
    assert response.status_code == 200
    stages = response.json()
    assert len(stages) == 7
    assert stages[0]["stage_number"] == 1
    assert "Understanding SIPs" in stages[0]["title"]
    assert stages[6]["stage_number"] == 7


def test_get_journey_stage_by_id(client):
    response = client.get("/api/v1/journey/stages/1")
    assert response.status_code == 200
    stage = response.json()
    assert stage["id"] == 1


def test_get_glossary(client):
    response = client.get("/api/v1/glossary")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 20
    terms = [t["term"] for t in data["items"]]
    assert "SIP" in terms
    assert "NAV" in terms
    assert "XIRR" in terms
    assert "Risk-o-meter" in terms


def test_get_glossary_term_by_slug(client):
    response = client.get("/api/v1/glossary/nav")
    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == "nav"
    assert "Net Asset Value" in data["definition"]


def test_search_glossary(client):
    response = client.get("/api/v1/glossary/search?q=cagr")
    assert response.status_code == 200
    items = response.json()
    assert len(items) >= 1
    assert any(t["term"] == "CAGR" for t in items)


def test_calculator_sip_contract(client):
    payload = {
        "monthly_investment": 5000,
        "expected_return_rate": 12.0,
        "time_period_years": 10,
        "contribution_timing": "beginning",
    }
    response = client.post("/api/v1/calculators/sip", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "phase_4_pending"
    assert data["calculator_type"] == "sip_future_value"


def test_calculator_validation_error(client):
    # Invalid monthly investment below minimum
    payload = {
        "monthly_investment": 100,  # Below minimum 500
        "expected_return_rate": 12.0,
        "time_period_years": 10,
    }
    response = client.post("/api/v1/calculators/sip", json=payload)
    assert response.status_code == 422


def test_chat_contract(client):
    payload = {"message": "What is NAV?"}
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "phase_5_pending"
    assert "session_id" in data
    assert "disclaimer" in data

    # Check history retrieval
    session_id = data["session_id"]
    hist_response = client.get(f"/api/v1/chat/history/{session_id}")
    assert hist_response.status_code == 200
    hist_data = hist_response.json()
    assert len(hist_data["messages"]) == 2  # user + assistant


def test_submit_feedback(client):
    payload = {
        "page": "calculators",
        "feedback_type": "clarity",
        "feedback_text": "The rupee-cost averaging simulation was very intuitive for beginners.",
        "rating": 5,
    }
    response = client.post("/api/v1/feedback", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["status"] == "received"
    assert data["id"] > 0


def test_cors_preflight(client):
    headers = {
        "Origin": "http://localhost:3000",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
    }
    response = client.options("/api/v1/feedback", headers=headers)
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:3000"
