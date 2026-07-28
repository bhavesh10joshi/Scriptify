# Scriptify - AI Product Content Generator

## Why I Built This

This project was built as part of a **MERN Stack practical interview assignment** from Valourithm Technologies . The assignment required building a full-stack AI-powered product content generator with the following core requirements:

- User authentication (register, login, JWT, protected routes, logout)
- A product input form (name, category, brand, features, target audience)
- AI-generated content (product description, short description, key selling points, SEO keywords, tagline)
- History view (see all previously generated content, open, delete)
- Clean and functional UI

**Bonus features implemented:**
- Copy entire content with one click
- Edit and regenerate content with a suggestion prompt

---

## What Is Scriptify?

Scriptify is an AI-powered eCommerce copywriting tool. You provide basic product details and Scriptify uses Google's Gemini AI to generate:

- A detailed product description (150-200 words)
- A short 2-3 line summary
- 5 key selling points
- 5-8 SEO keywords
- A catchy product tagline

You can view old generations, regenerate with changes, copy everything at once, or delete entries you no longer need.

---

## Tech Stack

### Backend
| Technology | Use |
|---|---|
| Node.js + TypeScript | Server runtime |
| Express.js | API framework |
| MongoDB + Mongoose | Database |
| JWT (jsonwebtoken) | Authentication |
| bcrypt | Password hashing |
| Google Gemini AI (`@google/genai`) | Content generation |
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
      Config/           - Gemini AI client setup
      Db/               - Mongoose models (User, Product)
      Middleware/        - JWT auth middleware
      Routers/
        User/            - /SignUp, /Login
        Product/
          ProductContent/ - /Generate/New, /Modulate, /Delete
          ProductHistory/ - /History, /History/Content/Old/View
      Services/          - AI content generation logic
      StatusCodes/       - HTTP status code constants
      Validations/       - Zod schemas
      types/             - TypeScript interfaces
      index.ts           - Express server entry point
    package.json
    tsconfig.json

  frontend/
    src/
      App.tsx            - Router + RootRoute logic
      main.tsx           - Entry point (also handles dark mode init)
      index.css          - Tailwind directives + global resets
      BackendUrl/
        BackendUrl.tsx   - Backend base URL constant
      Components/
        Navbar.tsx       - Top navbar (landing page)
      Pages/
        LandingPage.tsx  - Hero + features + how it works
        SignUp.tsx       - Registration form
        LogIn.tsx        - Login form
        Dashboard.tsx    - History view + create/delete actions
        ViewContent.tsx  - AI content display + copy + regenerate
      Types/
        types.ts         - ProductData TypeScript interface
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
    index.html
    package.json
    tailwind.config.js
    vite.config.ts
```

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|---|
| POST | `/Scriptify/Api/User/SignUp` | No | Register a new user |
| POST | `/Scriptify/Api/User/Login` | No | Login, returns JWT token |
| POST | `/Scriptify/Api/Product/History` | Yes | Get all generations for the logged-in user |
| POST | `/Scriptify/Api/Product/History/Content/Old/View` | Yes | View a specific generation by `ContentId` |
| POST | `/Scriptify/Api/Product/Content/Generate/New` | Yes | Generate new AI content |
| POST | `/Scriptify/Api/Product/Content/Modulate` | Yes | Regenerate existing content with a suggestion |
| POST | `/Scriptify/Api/Product/Content/Delete` | Yes | Delete a generation by `productId` |

> Auth is done by sending the JWT token raw in the `authorization` header (no "Bearer" prefix).

---

## How to Replicate (Local Setup)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### 1. Clone / navigate to the project

```bash
cd Scriptify
```

### 2. Set up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:

```env
JWT_PASS=your_jwt_secret_here
GEMINI_API_KEY=your_google_gemini_api_key
```

Also update the MongoDB connection string in `src/index.ts`:

```typescript
await mongoose.connect("your_mongodb_connection_string");
```

Build and start the backend:

```bash
npm run dev
```

The server runs on `http://localhost:3000`.

### 3. Set up the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

> If your backend URL is different, update `src/BackendUrl/BackendUrl.tsx`.

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
               Fill product form         ViewContent
               (name, category,          page opens
               brand, features,          with all AI
               audience)                  fields
                         |                   |
                   AI generates          Copy All / 
                   content via            Regenerate /
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

---

## Notes

- The backend is TypeScript compiled to JS (`tsc -b` then `node dist/index.js`)
- The `JWT_PASS` secret must match exactly between login and the auth middleware
- The Gemini API key is loaded from `.env` via `dotenv`
- Frontend validation runs on the client first (Zod) and then the backend validates again server-side
