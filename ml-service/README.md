# Aqua ML Intelligence Service

The Aqua ML service provides flood and river-risk prediction capabilities through a FastAPI microservice.

## Architecture

```text
Sensor observations
        ↓
Validation
        ↓
Preprocessing
        ↓
LSTM model
        ↓
Risk probability
        ↓
Risk score
        ↓
Risk level
        ↓
FastAPI response
```

## Setup

Create and activate a virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Generate development data:

```powershell
python training/generate_dataset.py
```

Train the development model:

```powershell
python training/train.py
```

Start the API:

```powershell
uvicorn app.main:app --reload --port 8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

Health endpoint:

```text
GET /api/v1/health
```

Prediction endpoint:

```text
POST /api/v1/predictions/predict
```

## Important

The synthetic dataset and heuristic risk calculation are development tools. They are not evidence of real-world flood prediction accuracy.

A production Aqua deployment should be trained and validated against appropriately sourced historical hydrological and meteorological data before its predictions are used operationally.
