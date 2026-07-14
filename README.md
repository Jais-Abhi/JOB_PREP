# PrepAI - AI Job Preparation Platform

PrepAI is a MERN-style career preparation web app for resume analysis and interview preparation. The frontend is a Vite + React dashboard, and the backend is an Express API that stores users and AI reports in MongoDB Atlas. Google Gemini is used to generate structured ATS and interview reports.

## Features

### Implemented

- User registration and login with email/password.
- JWT authentication stored in an HTTP-only cookie.
- Protected dashboard and application routes.
- Resume ATS analysis:
  - Upload a resume file.
  - Backend extracts text from the uploaded PDF.
  - Gemini generates a structured ATS report.
  - Report is saved in MongoDB and shown on a dedicated report page.
- ATS report dashboard:
  - Overall score out of 100.
  - Section score breakdown.
  - Strengths.
  - Prioritized improvement suggestions.
  - Overall feedback.
- Interview preparation report:
  - Upload a resume PDF or write a self-description.
  - Paste the target job description.
  - Gemini generates a match score, technical questions, behavioral questions, skill gaps, and a daily preparation plan.
  - Report is saved in MongoDB and shown on a dedicated report page.
- App shell:
  - Dashboard.
  - Sidebar navigation.
  - Main layout.
  - Toast notifications.

### UI Added / Coming Soon

These routes exist in the frontend, but are currently placeholder or local-only screens:

- Resume builder form.
- Resume templates.
- Analysis history.
- Past job analysis.
- Skill roadmap.
- Placement roadmap.
- DSA tracker.
- My plans.
- Account and settings.

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router
- Redux Toolkit + React Redux
- Axios
- Tailwind CSS
- shadcn-style UI components
- Radix UI
- Lucide React icons
- Framer Motion
- GSAP
- Sonner toast notifications

### Backend

- Node.js
- Express 5
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcrypt password hashing
- cookie-parser
- CORS
- Multer memory upload storage
- pdf-parse
- Google GenAI SDK
- Zod schemas for AI structured output

## Project Structure

```txt
Backend/
  Config/
    db.js
    generateReport.AI.js
  Controllers/
    auth.Controller.js
    interview.controller.js
    resume.controller.js
  Middleware/
    auth.middleware.js
    fileUpload.middleware.js
  Models/
    user.model.js
    resume.report.schema.js
    interview.model.js
    blackList.token.model.js
  Routes/
    auth.Route.js
    interview.route.js
    resume.route.js
  services/
    Interview_AI/
    resume/
  utils/
  server.js

Frontend/
  src/
    App.jsx
    Config/api.js
    Features/
      Auth/
      career-lab/
      dashboard/
      my-plans/
      profile/
      resume-studio/
    Pages/
    Redux/
    components/
```

## Project Flow

```mermaid
flowchart TD
  A[User opens React app] --> B{Authenticated?}
  B -- No --> C[Login / Register]
  C --> D[Backend Auth API]
  D --> E[MongoDB User]
  D --> F[HTTP-only JWT cookie]
  F --> G[Protected App]
  B -- Yes --> G
  G --> H[Dashboard]
  H --> I[Resume ATS Check]
  H --> J[Job Preparation]
  H --> K[Roadmaps / Plans / Profile UI]
```

## Resume ATS Flow

```mermaid
flowchart TD
  A[Upload resume from frontend] --> B[POST /api/resume/ats-check]
  B --> C[Auth middleware checks JWT cookie]
  C --> D[Multer stores uploaded file in memory]
  D --> E[pdf-parse extracts resume text]
  E --> F[Gemini generates JSON ATS report]
  F --> G[Zod response schema enforces report shape]
  G --> H[Save ResumeReport in MongoDB]
  H --> I[Push report id into user.resumeReports]
  I --> J[Return reportId]
  J --> K[Frontend opens /resume/ats-check/report/:id]
  K --> L[GET /api/resume/report/:id]
```

## Interview Preparation Flow

```mermaid
flowchart TD
  A[User uploads resume or writes self-description] --> B[User pastes job description]
  B --> C[POST /api/interview/generate-report]
  C --> D[Auth middleware checks JWT cookie]
  D --> E[Multer handles optional resume file]
  E --> F[pdf-parse extracts resume text when file exists]
  F --> G[Gemini compares candidate profile with job description]
  G --> H[Save InterviewReport in MongoDB]
  H --> I[Push report id into user.interviewReports]
  I --> J[Return reportId]
  J --> K[Frontend opens /job-preperation/report/:id]
  K --> L[GET /api/interview/report/:id]
```

## Environment Variables

Create `Backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<db_username>:<db_password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
GENAI_API_KEY=replace_with_your_google_ai_studio_key
```

Notes:

- `MONGO_URI` is used in `Backend/Config/db.js`.
- `JWT_SECRET` signs and verifies login tokens.
- `GENAI_API_KEY` is used in `Backend/Config/generateReport.AI.js`.
- The frontend API base URL is currently hardcoded in `Frontend/src/Config/api.js` as `http://localhost:5000`.

## How to Get Environment Keys

### Google Gemini API Key

Official docs: https://ai.google.dev/gemini-api/docs/api-key

1. Go to Google AI Studio: https://aistudio.google.com
2. Sign in with your Google account.
3. Open the API keys page.
4. Create a new Gemini API key.
5. Copy the key into `Backend/.env` as `GENAI_API_KEY`.

Google recommends keeping API keys in environment variables and never exposing them in frontend code. New AI Studio keys are moving toward authorization keys, and Google notes that standard key behavior changes in September 2026, so use a fresh key from AI Studio when setting up the project.

### MongoDB Atlas Connection String

Official docs: https://www.mongodb.com/docs/atlas/driver-connection/

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Create a project.
3. Create a free or paid cluster.
4. Add your current IP address to the Atlas Network Access list.
5. Create a database user with a username and password.
6. Click Connect on your cluster.
7. Choose Drivers.
8. Select Node.js as the driver.
9. Copy the `mongodb+srv://...` connection string.
10. Replace `<password>` with your database user's password.
11. Add a database name after `.mongodb.net/`, for example:

```env
MONGO_URI=mongodb+srv://myUser:myPassword@cluster0.mongodb.net/job_prep_ai?retryWrites=true&w=majority
```

If your password contains special characters like `@`, `#`, `/`, or `:`, URL-encode them before placing the password in the connection string.

### JWT Secret

Generate a long random string and place it in `JWT_SECRET`.

PowerShell:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Bash:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Installation

### Prerequisites

- Node.js 20 or newer recommended.
- npm.
- MongoDB Atlas account.
- Google AI Studio API key.

### 1. Clone the project

```bash
git clone <repository-url>
cd Job_Prep
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 4. Configure backend environment

Create `Backend/.env` using the sample above.

### 5. Run the backend

```bash
cd Backend
npm run dev
```

The backend runs on:

```txt
http://localhost:5000
```

### 6. Run the frontend

Open a second terminal:

```bash
cd Frontend
npm run dev
```

The frontend usually runs on:

```txt
http://localhost:5173
```

## API Routes

### Auth

```txt
POST /api/user/auth/register
POST /api/user/auth/login
GET  /api/user/auth/account
GET  /api/user/auth/logout
```

### Resume

```txt
POST /api/resume/ats-check
GET  /api/resume/report/:_id
```

### Interview

```txt
POST /api/interview/generate-report
GET  /api/interview/report/:_id
```

## Important Implementation Notes

- Uploaded files are stored in memory using Multer and limited to 5 MB.
- The backend currently parses PDFs for AI analysis. Some frontend copy mentions DOC/DOCX on the ATS upload screen, but the backend parsing path is PDF-based.
- Cookies are configured with `sameSite: "strict"` and `secure: true` only when `NODE_ENV=production`.
- CORS currently allows only `http://localhost:5173`.
- AI responses are requested as JSON using Zod-generated schemas.

## Common Issues

### MongoDB connection fails

- Check `MONGO_URI`.
- Make sure your current IP is allowed in MongoDB Atlas.
- Make sure the database username and password are correct.
- URL-encode special characters in the password.

### Gemini report generation fails

- Check `GENAI_API_KEY`.
- Make sure the key is active in Google AI Studio.
- Make sure billing/quota is available for the selected Gemini model.
- The current backend model is configured in `Backend/Config/generateReport.AI.js`.

### Frontend cannot call backend

- Make sure the backend is running on port `5000`.
- Make sure the frontend is running on `http://localhost:5173`.
- Check `Frontend/src/Config/api.js` if you change the backend URL.

## Scripts

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## References

- Google Gemini API key docs: https://ai.google.dev/gemini-api/docs/api-key
- MongoDB Atlas driver connection docs: https://www.mongodb.com/docs/atlas/driver-connection/
