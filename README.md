# Blueprint Organizer Pro

A modern blueprint and drawing management system for professional teams that need to:

- upload and organize PDFs and image files
- automatically extract metadata and OCR text
- review and confirm extraction results before final classification
- manage user roles and permissions per project
- search with full-text metadata and OCR indexing
- store files locally or in S3-compatible cloud storage
- access the app from desktop and mobile devices

## Features

- PDF + image support (PDF, PNG, JPG, TIFF)
- OCR-powered extraction
- review workflow for auto-detected fields
- custom project, category, and tag structure
- role-based access control per user and project
- local + cloud storage adapters
- responsive UI for desktop and mobile
- audit log and review history

## Stack

- Frontend: Next.js 14 + React + TypeScript
- Backend: NestJS + TypeScript
- Database: PostgreSQL
- Storage: Local disk + MinIO/S3-compatible object storage
- OCR: Tesseract
- Containerization: Docker Compose

## Quick start

```bash
cp .env.example .env
npm install
npm run docker:up
npm run backend:dev
npm run frontend:dev
```

Then open:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- MinIO Console: http://localhost:9001

## Project structure

```text
.
├── backend/
├── frontend/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── docs/
```

## DRAFT roadmap

1. Authentication and role-based access control
2. Upload workflow and validation
3. OCR extraction and review queue
4. Project-based classification and tagging
5. Search and indexing
6. Local and cloud storage sync
7. Audit logs and review history
8. Mobile-first responsive views

## Notes

This repository is intentionally set up as a production-oriented starter for a blueprint management application, with a strong focus on approval workflows and permissions.
