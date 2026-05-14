# Interviewer

![React](https://img.shields.io/badge/Frontend-React-blue)
![Vite](https://img.shields.io/badge/Build-Vite-purple)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/License-Custom-red)

---

Interviewing platform for carrying out real-time interviews between interviewers and interviewees.


Live Demo: https://interviewer-f9pz.onrender.com/ 
Repository: https://github.com/Ce3Pi0/Interviewer

---

## Table of contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Environment Variables](#environment-variables)
- [System Architecture](#system-architecture)
- [API Architecture](#api-architecture)
- [Database Design](#database-design)
- [Deployment Architecture](#deployment-architecture)
- [Testing Strategy](#testing-strategy)
- [Coding Style](#coding-style)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Built With](#built-with)
- [License](#license)
- [Acknowledgments](#acknowledgments)

<a id="getting-started"></a>
## Getting Started

This project is a full-stack application built with **React (Vite)**, **Express (TypeScript)**, and **MongoDB**, featuring real-time video and chat feeds as well as isolated sandboxes for running JavaScript, Python, and Java code.

---

<a id="prerequisites"></a>
## Prerequisites

- Node.js (v18+)
- npm
- MongoDB account and instance
- Clerk Account (User Management)
- Inngest Account (Background Jobs)
- Stream Account (Video & Chat Feeds)
- Render Account (Deployment & Hosting)
- RapidAPI Account (Isolated Sandbox Environments)

---

<a id="installing"></a>
## Installing

Clone the repository:

```bash
git clone https://github.com/Ce3Pi0/Interviewer.git
cd Interviewer
```

Install dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
```

<a id="environment-variables"></a>
## Environment Variables

Create .env files in both frontend and backend:

- Frontend:

  ```bash
  VITE_CLERK_PUBLISHABLE_KEY
  VITE_API_BASE_URL
  VITE_STREAM_API_KEY
  ```

- Backend:
  ```bash
  API_SUB_DOMAIN
  PORT
  DB_URL
  NODE_ENV
  CLIENT_URL
  INNGEST_EVENT_KEY
  INNGEST_SIGNING_KEY
  STREAM_API_KEY
  STREAM_API_SECRET
  CLERK_PUBLISHABLE_KEY
  CLERK_SECRET_KEY
  RAPIDAPI_HOST
  RAPIDAPI_KEY
  ```

<a id="running-the-project"></a>
## Running the Project

- Backend:

  ```bash
  cd backend
  npm run dev
  ```

- Frontend:
  ```bash
  cd frontend
  npm run dev
  ```

#### Development URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:<PORT>

<a id="system-architecture"></a>
## System Architecture

### High Level Architecture

<img width="1038" height="541" alt="InterviewerSystemArchitecture" src="https://github.com/user-attachments/assets/27307e58-8ecb-4927-9122-297e04c158dc" />

### Architecture Principles

1. #### Client-Server Separation
   - React handles UI and rendering
   - Express handles API and backend logic
1. #### Event-Driven Realtime System
   - Stream Manages:
     - Real-Time Messaging
     - Video Feeds
1. #### Stateless Authentication
   - Clerk Authentication
   - Google OAuth via Clerk
1. #### Cloud-Backed Media Layer
   - Clerk Provides:
     - Profile Images
   - Stream Provides:
     - Chat Images 

<a id="api-architecture"></a>
## API Architecture

### Base URL

```
<hostname>/api/v<version number>
```

## API Routes

- ### Server

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET | /api/v1/server/health | API Health |

- ### User

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET | /api/v1/user/count | Get User Count |
  | GET | /api/v1/user | Get Current User |
  | POST | /api/v1/user/type | Set User Type |

- ### Session

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET | /api/v1/session/count | Get Session Count |
  | POST | /api/v1/session | Create Session |
  | GET | /api/v1/sessions/active | Active Sessions |
  | GET | /api/v1/sessions/my-recent | Recent Sessions |
  | GET | /api/v1/session/:id | Session |
  | POST | /api/v1/session/:id/join | Join Session |
  | POST | /api/v1/session/:id/end | End Session |

- ### Problem

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET | /api/v1/problem/count | Get Problems Count |
  | GET | /api/v1/problem/ | Get All Problems |
  | GET | /api/v1/problem/:id | Get Problem By Id |
  | POST | /api/v1/problem/ | Create Problem |

- ### Chat

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET | /api/v1/chat/token | Get Token |

- ### Execute

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | POST | /api/v1/execute/ | Execute Code |


- ### Data Flow Example

  # CREATE DATA FLOWS!!!

 
<a id="database-design"></a>
## Database Design

- ### User Model
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | name | string | Yes | User name |
  | email | string | Yes | Unique email |
  | profileImage | string | No | Profile image |
  | clerkId | string | Yes | Clerk authentication ID |
  | type | string | No | User type (interviewer/interviewee) |
  | createdAt | Date | Yes | Timestamp |
  | updatedAt | Date | Yes | Timestamp |
- ### Problem Model
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | title | string | Yes | Problem title |
  | difficulty | string | Yes | Difficulty level (easy/medium/hard) |
  | category | string | No | Problem category |
  | description.text | string | Yes | Problem description text |
  | description.notes | string[] | No | Additional notes |
  | examples | object[] | No | Problem examples with input, output, explanation |
  | constraints | string[] | Yes | Problem constraints |
  | starterCode.javascript | string | Yes | JavaScript starter code |
  | starterCode.python | string | Yes | Python starter code |
  | starterCode.java | string | Yes | Java starter code |
  | expectedOutput.javascript | string | Yes | JavaScript expected output |
  | expectedOutput.python | string | Yes | Python expected output |
  | expectedOutput.java | string | Yes | Java expected output |
  | createdAt | Date | Yes | Timestamp |
  | updatedAt | Date | Yes | Timestamp |
- ### Session Model
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | problem | string | Yes | Problem title or identifier |
  | difficulty | string | Yes | Difficulty level (easy/medium/hard) |
  | host | ObjectId | Yes | References User collection |
  | participant | ObjectId | No | References User collection |
  | status | string | No | Session status (active/completed) |
  | callId | string | No | Call session identifier |
  | createdAt | Date | Yes | Timestamp |
  | updatedAt | Date | Yes | Timestamp |
---
- ### Relationships
  - Session.host -> User (1 -> 1)
  - Chat.participant -> User (1 -> 1/0)

<a id="deployment-architecture"></a>
## Deployment Architecture

```
Frontend (Vite) -> Render Static Hosting
Backend (Express) -> Render Web Service
Database -> MongoDB Atlas
Authentication -> Clerk
Background Jobs -> Inngest
Video & Chat Services -> Stream
Isolated Sandbox Environments -> RapidAPI (sandboxapi)
```

<a id="testing-strategy"></a>
## Testing Strategy

This project does not include automated unit tests.

### Manual Testing (Postman)

- Import Postman collection from:
  ```bash
  /postman/Interviewer.postman_collection.json
  ```
- Test the following endpoint groups:
  - Server
  - User
  - Session
  - Problem
  - Chat
  - Execute

<a id="coding-style"></a>
## Coding Style

- ESLint
- Prettier

<a id="deployment"></a>
## Deployment

Deployed on Render.

Build command:

```bash
cd frontend && npm install && npm run build && cd ../backend && npm install && npm run build 
```

Start command:

```bash
cd backend && npm run start
```

<a id="screenshots"></a>
## Screenshots:

# INCLUDE SCREENSHOTS!!!

<a id="built-with"></a>
## Built With

- React (Vite)
- Express.js (TypeScript)
- MongoDB
- Clerk
- Inngest
- Stream
- RapidAPI (sandboxapi)

<a id="license"></a>
## License

This project is based on:
https://github.com/burakorkmez/talent-iq

License terms:

- Allowed for learning and portfolio use
- Not allowed for commercial use or redistribution without permission

<a id="acknowledgments"></a>
## Acknowledgments

- Codesistency
- Clerk
- Inngest
- Stream
- RapidAPI
- SandboxAPI
- MongoDB
- Render
