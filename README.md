# Aqua

## Flood & Riverbank-Erosion Early-Warning Platform

Aqua is a production-oriented full-stack climate intelligence platform that combines:

- Satellite observations
- River-gauge sensor data
- Time-series prediction
- Flood-risk visualization
- Riverbank-erosion intelligence
- AI-assisted explanations
- Early-warning workflows

---

# Architecture

```text
                 ┌─────────────────────┐
                 │       Browser       │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ React + TypeScript  │
                 │ Tailwind + Motion   │
                 │ Leaflet             │
                 └──────────┬──────────┘
                            │ REST
                            ▼
                 ┌─────────────────────┐
                 │ Node + Express API  │
                 └──────┬─────────┬────┘
                        │         │
                        ▼         ▼
                MongoDB Atlas   ML Service
                              Python/FastAPI
                                   │
                                   ▼
                              LSTM Forecast