# AGENTS.md

** IF USER HAS NOT PROVIDED SUFFICIENT INFORMATION FOR THE QUESTION, ASK FURTHER CLARIFYING QUESTIONS UNTIL YOU REACH A 95% CERTAINTY **

## Project structure

- `backend/` — Express 5 + TypeScript API (ESM, `"type": "module"`)
- `frontend/` — React 19 + TypeScript + Vite SPA
- `postman/` — Empty, reserved for API collections
- No root `package.json` — each package is independent with its own `node_modules`

## Developer commands

**Backend** (`cd backend`):

- `npm run dev` — starts dev server with nodemon (watch mode)
- `npm run build` — compiles to `dist/` via `tsc`, copies `package.json`
- `npm run start` — runs `node dist/index.js`
- Entry point: `src/index.ts`, listens on port defined by `PORT` in `.env`

**Frontend** (`cd frontend`):

- `npm run dev` — starts Vite dev server with HMR
- `npm run build` — typechecks (`tsc -b`) then builds via Vite
- `npm run lint` — runs ESLint
- `npm run preview` — preview production build locally

## Key details

- Backend uses **dotenv**
- **Mongoose** is a dependency but MongoDB is not yet connected in code
- Frontend is still the default Vite template — no application code written yet
- No test framework configured in either package
- No CI/CD, pre-commit hooks, or codegen setup

## Conventions

- LF line endings enforced via `.gitattributes` (`text=auto`)
