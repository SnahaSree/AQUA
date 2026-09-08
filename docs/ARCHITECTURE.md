# Aqua Architecture

## Overview

Aqua is a flood and riverbank-erosion early-warning platform.

## System

Browser
    ↓
React + TypeScript
    ↓
REST API
    ↓
Node.js + Express
    ↓
Service Layer
    ↓
MongoDB Atlas

Node.js API
    ↓
Internal prediction request
    ↓
Python FastAPI ML Service
    ↓
LSTM / LSTM + Attention
    ↓
Flood-risk forecast

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Leaflet

## Backend

- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Zod
- JWT
- bcrypt
- Helmet
- CORS
- Rate limiting
- Pino

## ML

- Python
- FastAPI
- NumPy
- LSTM / LSTM + Attention

## Database Collections

- users
- sensorReadings
- riskPredictions
- caseStudies
- contactRequests
- chatLogs

## Security

Secrets remain server-side.

MongoDB credentials are never exposed to the frontend.

Admin operations require authentication.

Public state-changing endpoints are validated and rate-limited.