# Scriptify - AI Product Content Generator

## Why I Built This

This project was built as part of a **MERN Stack practical interview assignment** from VALTHM. The assignment required building a full-stack AI-powered product content generator with the following core requirements:

- User authentication (register, login, JWT, protected routes, logout)
- A product input form (name, category, brand, features, target audience)
- AI-generated content (product description, short description, key selling points, SEO keywords, tagline)
- Product history (view all previous generations, open specific ones, delete)
- Clean and functional UI

**Bonus features implemented:**
- Copy all generated content to clipboard with one click
- Edit and regenerate content using a custom suggestion prompt

---

## What Is Scriptify?

Scriptify is an AI-powered eCommerce copywriting tool. You provide basic product details and Scriptify uses Google's Gemini AI to generate:

- A detailed product description (150-200 words)
- A short 2-3 line summary
- 5 key selling points
- 5-8 SEO keywords
- A catchy product tagline

You can view past generations, regenerate with specific feedback, copy everything at once, or delete entries you no longer need.

---

## Tech Stack

### Backend
| Technology | Use |
|---|---|
| Node.js + TypeScript | Server runtime |
| Express.js | REST API framework |
| MongoDB + Mongoose | Database |
| JWT (`jsonwebtoken`) | Authentication |
| bcrypt | Password hashing |
| Google Gemini AI (`@google/genai`) | AI content generation |
| dotenv | Environment variable management |
| Zod | Input validation |

### Frontend
| Technology | Use |
|---|---|
| React + TypeScript | UI framework |
| Vite | Build tool |
| Tailwind CSS v3 | Styling |
| Axios | HTTP requests |
| React Router DOM | Client-side routing |
| Zod | Frontend form validation |

---

## Folder Structure

```
Scriptify/
  Backend/
    src/
      Config/             - Gemini AI client setup
      Db/                 - Mongoose models (User, Product)
      Middleware/         - JWT auth middleware
      Routers/
        User/             - /SignUp, /Login
        Product/
          ProductContent/ - /Generate/New, /Modulate, /Delete
          ProductHistory/ - /History, /History/Content/Old/View
      Services/           - AI content generation & refinement logic
      StatusCodes/        - HTTP status code constants
      Validations/        - Zod validation schemas
      types/              - TypeScript interfaces for AI service
      index.ts            - Express server entry point
    .env                  - Your local environment variables (not committed)
    .env.example          - Template showing required environment variables
    vercel.json           - Vercel deployment config for the backend
    package.json
    tsconfig.json

  frontend/
    src/
      App.tsx             - Router + RootRoute logic (token check)
      main.tsx            - Entry point + dark mode init (no flash)
      index.css           - Tailwind directives + global resets
      BackendUrl/
        BackendUrl.tsx    - Backend URL (reads VITE_BACKEND_URL env variable)
      Components/
        Navbar.tsx        - Top navbar (landing page only)
      Pages/
        LandingPage.tsx   - Hero + features + how it works
        SignUp.tsx        - Registration form
        LogIn.tsx         - Login form
        Dashboard.tsx     - History view + create/delete actions
        ViewContent.tsx   - AI content display + copy + regenerate
      Types/
        types.ts          - ProductData TypeScript interface
      Ui/
        Popups/
          SuccessPopup.tsx        - Glassmorphism success notification
          ErrorPopup.tsx          - Glassmorphism error notification
          LoadingPopup.tsx        - Glassmorphism loading spinner
          ConfirmDeletePopup.tsx  - Delete confirmation dialog
          CreateProductPopup.tsx  - New product form overlay
          RegeneratePopup.tsx     - Regeneration suggestion input
      Validations/
        ZodValidations.tsx  - SignUp + Login Zod schemas
    .env.example          - Template showing required frontend env variable
    vercel.json           - Vercel deployment config for the frontend (SPA routing)
    index.html
    package.json
    tailwind.config.js
    vite.config.ts

  SampleData.json   - Sample product data for testing the generate endpoint
  README.md
```

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|---|
| POST | `/Scriptify/Api/User/SignUp` | No | Register a new user (`name`, `email`, `Password`) |
| POST | `/Scriptify/Api/User/Login` | No | Login, returns JWT token |
| POST | `/Scriptify/Api/Product/History` | Yes | Get all generations for the logged-in user |
| POST | `/Scriptify/Api/Product/History/Content/Old/View` | Yes | View a specific generation by `ContentId` |
| POST | `/Scriptify/Api/Product/Content/Generate/New` | Yes | Generate new AI content |
| POST | `/Scriptify/Api/Product/Content/Modulate` | Yes | Regenerate existing content with a suggestion |
| POST | `/Scriptify/Api/Product/Content/Delete` | Yes | Delete a generation by `productId` |

> Auth header: send the JWT token as a raw value in the `authorization` header (no "Bearer" prefix).

---

## Environment Variables

### Backend — `Backend/.env.example`
```env
JWT_PASS = 'YOUR_JWT_PASS'
GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'
MONGODB_URL = 'YOUR_MONGODB_URL'
PORT = '5000'
FRONTEND_URL = 'YOUR_DEPLOYED_FRONTEND_VERCEL_URL'
```

### Frontend — `frontend/.env.example`
```env
VITE_BACKEND_URL = 'YOUR_DEPLOYED_BACKEND_VERCEL_URL'
```

---

## Sample Data for Testing

A `SampleData.json` file is included at the project root for quick testing of the content generation endpoint.

**`SampleData.json`** — contains 3 sample products:

| # | Product | Brand | Category |
|---|---------|-------|----------|
| 1 | PulseFit Pro Smartwatch | VeloTech | Wearable Technology & Fitness |
| 2 | HydraGlow Hyaluronic Acid Serum | NaturaBotanica | Skincare & Beauty |
| 3 | EcoChill Stainless Steel Tumbler | TerraGear | Kitchenware & Drinkware |

Use these as input values when testing the `Generate/New` endpoint via Postman or the frontend form.

---

## Running Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Scriptify
```

### 2. Run the Backend locally

```bash
cd Backend
npm install
cp .env.example .env
```

Fill in `Backend/.env` with your real values:

```env
JWT_PASS = 'any_strong_secret'
GEMINI_API_KEY = 'your_gemini_key'
MONGODB_URL = 'mongodb+srv://user:pass@cluster.mongodb.net/scriptify'
PORT = '5000'
FRONTEND_URL = 'http://localhost:5173'
```

Build and start:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

### 3. Run the Frontend locally

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`. No `.env` needed locally since `BackendUrl.tsx` falls back to `http://localhost:5000`.

---

## Deploying to Vercel

Both the backend and frontend are deployed as **separate Vercel projects** from the same GitHub repository. Follow these steps in order.

> **Important:** Deploy the backend first so you have its URL before setting up the frontend.

---

### Step 1 — Push your code to GitHub

Make sure your latest code (including `vercel.json` files) is pushed:

```bash
git add .
git commit -m "add vercel deployment config"
git push
```

Confirm that `.gitignore` in both `Backend/` and `frontend/` contains `.env` so your secrets are not committed.

---

### Step 2 — Deploy the Backend

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. On the configuration screen, set **Root Directory** to `Backend`
4. Vercel will auto-detect the settings. Confirm:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Environment Variables** and add these 5 variables:

| Variable | Value |
|---|---|
| `JWT_PASS` | Your chosen JWT secret (keep it strong) |
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `MONGODB_URL` | Your MongoDB Atlas connection string |
| `PORT` | `5000` (Vercel ignores this in serverless mode but good to have) |
| `FRONTEND_URL` | Leave blank for now — you'll add this after the frontend deploys |

6. Click **Deploy**
7. Once deployed, copy the URL Vercel gives you — it looks like `https://scriptify-backend-xyz.vercel.app`
8. Go back into the backend project → **Settings → Environment Variables** → add:

| Variable | Value |
|---|---|
| `FRONTEND_URL` | Your frontend Vercel URL (add this after Step 3) |

---

### Step 3 — Deploy the Frontend

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the **same** GitHub repository
3. On the configuration screen, set **Root Directory** to `frontend`
4. Confirm settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Environment Variables** and add:

| Variable | Value |
|---|---|
| `VITE_BACKEND_URL` | The backend URL from Step 2 (e.g. `https://scriptify-backend-xyz.vercel.app`) |

6. Click **Deploy**
7. Copy the frontend URL — it looks like `https://scriptify-frontend-xyz.vercel.app`

---

### Step 4 — Link Frontend URL to Backend CORS

This step is required or the frontend will get CORS errors when calling the backend.

1. Go to your **backend** Vercel project → **Settings → Environment Variables**
2. Add or update:

| Variable | Value |
|---|---|
| `FRONTEND_URL` | Your frontend Vercel URL from Step 3 (e.g. `https://scriptify-frontend-xyz.vercel.app`) |

3. Go to **Deployments** → click the three dots on the latest deployment → **Redeploy**
   (Vercel needs a redeploy for new env variables to take effect)

---

### Step 5 — Verify

Open your frontend Vercel URL in a browser and check:

- [ ] Landing page loads
- [ ] Sign Up creates an account
- [ ] Login returns a token and redirects to Dashboard
- [ ] Creating new content calls AI and shows results
- [ ] Refreshing any page does not 404 (handled by `frontend/vercel.json`)

---

## How It Works (Vercel Deployment)

```
Browser
  |
  | HTTPS request
  v
frontend (Vercel) ─── serves React SPA from dist/
  |                   vercel.json rewrites all routes to index.html
  | Axios call (VITE_BACKEND_URL)
  v
backend (Vercel) ─── Express app exported as default
  |                  vercel.json routes all /Scriptify/Api/* to dist/index.js
  | Mongoose
  v
MongoDB Atlas ─── stores users and product content
  |
  | @google/genai
  v
Gemini AI ─── generates product descriptions, keywords, taglines
```

---

## Application Workflow

```
User visits /  →  If logged in: Dashboard  →  If not: Landing Page
                                   |
                         +---------+---------+
                         |                   |
                    Create New           View History
                      Content              Card
                         |                   |
               Fill product form         Click "View"
               (name, category,              |
               brand, features,         ViewContent page
               audience)                shows all AI fields
                         |                   |
                   AI generates         Copy All / Regenerate
                   content via           with suggestion /
                   Gemini API              Go Back
                         |
                Redirects to
                ViewContent
```

---

## Features Summary

| Feature | Status |
|---|:---:|
| User Registration | Done |
| User Login with JWT | Done |
| Protected routes (token check) | Done |
| Generate AI product content | Done |
| View history of past generations | Done |
| View a specific past generation | Done |
| Delete a generation (with confirmation) | Done |
| Copy all content with one click | Done |
| Regenerate with custom suggestion | Done |
| Light and Dark mode | Done |
| Glassmorphism popups | Done |
| Responsive layout | Done |
| SampleData.json for testing | Done |
| .env.example for both frontend & backend | Done |
| Vercel deployment (backend + frontend) | Done |

---

## Notes

- Never commit your `.env` files — both `Backend/.gitignore` and `frontend/.gitignore` should include `.env`
- The `JWT_PASS` secret must be identical between sign (UserRouter) and verify (Middleware)
- CORS only allows requests from `FRONTEND_URL` — after adding this env var you must redeploy the backend
- `VITE_BACKEND_URL` is baked into the frontend bundle at build time by Vite — changing it requires a new frontend deploy
- The backend TypeScript source compiles to `dist/` — Vercel runs `node dist/index.js` as a serverless handler
- `process.env.VERCEL` is set to `"1"` automatically by Vercel — the backend uses this to skip `App.listen()`
