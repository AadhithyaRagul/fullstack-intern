# Mini SaaS Template Store

Full-stack app: register/login (JWT), browse templates, favorite them, and view "My Favorites".

## Tech Stack
- Frontend: React (Vite), React Router, Axios, TailwindCSS
- Backend: Node.js, Express, JWT, bcryptjs
- Database: SQLite with Knex.js (auto-creates tables and seeds 6 templates)

## Setup
### Backend
```bash
cd server
npm install
cp .env.example .env   # set JWT_SECRET
npm run dev            # http://localhost:5000
```
### Frontend
```bash
cd client
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000/api
npm run dev            # http://localhost:5173
```

## API
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Register |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/templates?search=&category= | No | List templates |
| GET | /api/templates/:id | No | Template details |
| POST | /api/favorites/:templateId | Yes | Add favorite |
| GET | /api/favorites | Yes | My favorites |
| DELETE | /api/favorites/:templateId | Yes | Remove favorite |

## Bonus implemented
Search + category filter, logout, protected routes, un-favorite.

## Author
NAME:AADHITHYA A ,MAIL-aadhithyaragul@gmail.com,CONTACT-8248718949
