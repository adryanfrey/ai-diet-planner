# Developer Documentation

## Overview

This project is an **AI Diet Planner** — a web application that generates personalized daily meal plans using AI. The application consists of two main parts:

1. **Frontend (Web)**: A React App built with React Router and Mantine UI
2. **Backend (API)**: A FastAPI server that leverages OpenAI's agents to generate personalized meal plans

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              User's Browser                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    React Frontend (Mantine UI)                       │    │
│  │  • Multi-step questionnaire                                          │    │
│  │  • Meal plan display                                                 │    │
│  │  • Nutritional insights                                              │    │
│  └──────────────────────────────────┬──────────────────────────────────┘    │
└─────────────────────────────────────┼───────────────────────────────────────┘
                                      │ HTTP POST /api/plan-diet
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FastAPI Backend                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Plan Diet Service                                 │    │
│  │  • Input validation (Pydantic schemas)                               │    │
│  │  • AI Agent with meal planning tools                                 │    │
│  │  • Nutritional calculations                                          │    │
│  │  • Output validation                                                 │    │
│  └──────────────────────────────────┬──────────────────────────────────┘    │
└─────────────────────────────────────┼───────────────────────────────────────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │   OpenAI API  │
                              │  (AI Agents)  │
                              └───────────────┘
```

---

## Tech Stack

### Frontend (`/web`)

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| React 19       | UI library                        |
| React Router 7 | Routing and server-side rendering |
| Mantine 8      | Component library                 |
| TypeScript     | Type safety                       |
| Vite           | Build tool and dev server         |
| Tabler Icons   | Icon library                      |

### Backend (`/api`)

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| Python 3.13+      | Runtime                         |
| FastAPI           | Web framework                   |
| OpenAI Agents SDK | AI agent orchestration          |
| Pydantic          | Data validation and settings    |
| Pydantic Settings | Environment variable management |

---

## Project Structure

```
ai-diet-planner/
├── README.md
│
├── api/                         # Backend application (FastAPI + Python)
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── apis/                # API route handlers (HTTP endpoints)
│   │   │   └── plan_diet.py
│   │   ├── services/            # Business logic and AI agent orchestration
│   │   │   └── plan_diet.py
│   │   ├── schemas/             # Pydantic models for request/response validation
│   │   │   ├── plan_diet.py
│   │   │   ├── diet.py
│   │   │   └── api_response_models.py
│   │   ├── prompts/             # AI agent instruction templates
│   │   │   └── plan_diet.py
│   │   ├── exceptions/          # Custom exception handlers
│   │   │   └── plan_diet.py
│   │   └── utils/               # Shared helper functions
│   │       ├── calculate_targets_tool.py
│   │       └── run_with_timeout.py
│   ├── pyproject.toml
│   └── mypy.ini
│
└── web/                         # Frontend application (React + TypeScript)
    ├── app/
    │   ├── root.tsx
    │   ├── routes.ts
    │   ├── routes/              # Page components with server-side actions
    │   │   ├── home.tsx
    │   │   ├── questionnaire.tsx
    │   │   └── my-diet.tsx
    │   ├── components/          # UI components
    │   │   ├── layout.tsx
    │   │   ├── custom-error-boundary.tsx
    │   │   ├── feature-card.tsx
    │   │   ├── meal-daily-plan-card.tsx
    │   │   ├── nutrition-overview.tsx
    │   │   └── questionnaire-steps/
    │   │       ├── personal-info-step.tsx
    │   │       ├── goals-step.tsx
    │   │       ├── preferences-step.tsx
    │   │       ├── restrictions-step.tsx
    │   │       └── types.ts
    │   ├── services/            # API client functions (server-side only)
    │   │   ├── plan-diet.ts
    │   │   └── get-diet-plan.ts
    │   ├── types/               # TypeScript type definitions
    │   │   ├── diet.ts
    │   │   └── questionnaire-data.ts
    │   └── utils/               # Shared helper functions
    │       └── fetch-api.server.ts
    ├── public/                  # Static assets (images, icons, fonts)
    │   ├── ai-diet-logo.png
    │   └── ai-diet-logo-icon.png
    └── package.json
```

### Backend (`/api`)

| Folder        | Responsibility                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `apis/`       | Defines HTTP endpoints and handles request/response flow. Each file corresponds to a resource or feature area.  |
| `services/`   | Contains business logic, including AI agent configuration, meal plan generation, and external API interactions. |
| `schemas/`    | Pydantic models for validating incoming requests and structuring outgoing responses.                            |
| `prompts/`    | Stores AI agent instruction templates and prompt configurations used by the plan diet service.                  |
| `exceptions/` | Custom exception handlers for error management.                                                                 |
| `utils/`      | Generic helper functions shared across the application (e.g., nutritional calculations, timeout handling).      |

### Frontend (`/web`)

| Folder        | Responsibility                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `routes/`     | Page-level components that define views and server-side actions. Each file maps to a URL route. |
| `components/` | UI components (forms, layouts, meal plan displays) that are composed within routes.             |
| `services/`   | Server-side functions that communicate with the backend API.                                    |
| `types/`      | TypeScript type definitions shared across the frontend application.                             |
| `utils/`      | Shared utility functions for API calls and common operations.                                   |
| `public/`     | Static assets served directly to the browser (images, favicon, logos).                          |

---

## Getting Started

### Prerequisites

- **Node.js** (v18+)
- **Python** (3.13+)
- **uv** (Python package manager)
- **OpenAI API Key**

### Backend Setup

```bash
cd api

# Install dependencies using uv
uv sync

# Run the development server
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend Setup

```bash
cd web

# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## Environment Variables

### Backend (`/api/.env`)

| Variable              | Description                            | Example       |
| --------------------- | -------------------------------------- | ------------- |
| `OPENAI_API_KEY`      | OpenAI API key for AI services         | `sk-...`      |
| `LOW_COST_LLM_MODEL`  | LLM model for less critical operations | `gpt-4o-mini` |
| `HIGH_COST_LLM_MODEL` | LLM model for complex meal planning    | `gpt-4o`      |

### Frontend (`/web/.env`)

| Variable       | Description          | Example                     |
| -------------- | -------------------- | --------------------------- |
| `API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |

---

## Known Technical Limitations

1. **Testing**: No tests implemented (unit tests and E2E)
2. **Rate Limiting**: No rate limiting implemented
3. **CORS**: Basic CORS configuration (allows all origins in development)
4. **Logging**: Very limited logging and observability
5. **Database**: No database to store meal plans or user data
6. **Authentication**: No user authentication
7. **CI/CD**: No GitHub Actions workflow for automated testing/linting/deployments
8. **Frontend Theme**: No customized and centralized theme configuration
9. **Mobile Responsiveness**: UI needs refinement for mobile friendliness
