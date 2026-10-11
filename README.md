<div align="center">

# ⚡ SkillSprint PRO
### Autonomous Generative AI Curriculum Synthesis & Competency Verification Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://skillsprint-navy.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4%20%2F%204.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Stop collecting passive tutorials. Master production engineering with verified milestones.**

[🌐 Explore Live Application](https://skillsprint-navy.vercel.app/) • [🚀 Getting Started](#-getting-started) • [📐 Theoretical Foundation](#-theoretical-foundation--methodology) • [🏗️ System Architecture](#-system-architecture)

---

</div>

## 📖 Executive Summary & Abstract

**SkillSprint** is an intelligent, full-stack learning platform engineered to solve the prevalent issue of **"Tutorial Hell"** among engineering students and self-directed developers. Rather than subjecting learners to static video playlists and passive consumption, SkillSprint leverages **Generative AI (Google Gemini API)** to transform natural language learning goals or production objectives (e.g., *Full-Stack Microservices*, *MLOps & DevOps Data Safety*, *Go Systems Programming*) into structured, week-by-week dependency graphs.

Each milestone incorporates curated technical briefs, hands-on tasks, and AI-evaluated scenario quizzes that test active recall and problem-solving before granting progress accreditation.

---

## 🧠 Theoretical Foundation & Methodology

SkillSprint is grounded in established cognitive science and pedagogical learning frameworks:

### 1. Bloom's Revised Cognitive Taxonomy
Traditional technical education platforms disproportionately focus on low-order cognitive levels (Levels 1 & 2: *Remembering* and *Understanding*). SkillSprint's architecture systematically shifts learners toward higher-order cognitive domains:
* **Level 3 (Applying):** Hands-on sandbox tasks and real-world implementation exercises.
* **Level 4 (Analyzing):** Architectural decomposition of distributed systems and security protocols.
* **Level 5 (Evaluating):** Milestone scenario quizzes testing design trade-offs and edge-case mitigation.
* **Level 6 (Creating):** Prompt-to-Execution compiler synthesizing production boilerplates and deployment blueprints.

### 2. Cognitive Load Theory (Sweller, 1988)
Unstructured technical documentation causes high *extraneous cognitive load*. SkillSprint mitigates cognitive overload through:
* **Chunking:** Engineering domains are partitioned into strict 4-week atomic sprints.
* **Progressive Disclosure:** Advanced topics unlock sequentially only after fundamental concepts and milestone checkpoints are mastered.
* **Scaffolding:** Clear architectural AST definitions, study guides, and milestone quizzes guide learners through the proximal zone of development (Vygotsky).

### 3. Active Recall & The Testing Effect (Roediger & Karpicke)
Passive re-reading of tutorials creates an illusion of competence. SkillSprint enforces active evaluation quizzes at the end of each module, ensuring concepts are consolidated into long-term memory.

---

## ✨ Key Features & Capabilities

* 🎯 **Autonomous Roadmap Synthesizer:** Type any engineering domain or role. The AI compiler breaks down requirements, prerequisites, weekly modules, and recommended resources into an interactive milestone graph.
* 🛡️ **Prompt-to-Execution Engine:** Describe complex architectures (e.g., *Zero-Trust MLOps pipeline*, *High-Throughput Kafka cluster*) and immediately receive architectural specifications, code templates, and safety requirements.
* 📝 **Adaptive Milestone Quizzes:** Scenario-based technical evaluations assessing practical problem-solving rather than rote syntax memorization.
* 🌐 **Interactive 3D Stage & WebGL Topology:** Built with **Three.js** and **Vanta.js** to visualize curriculum structures in an immersive, tactile visual format.
* 📊 **Personal Engineer Dashboard:** Real-time tracking of active sprints, completion percentages, quiz scores, and certificate status.
* 🔐 **Secure Session & Data Layer:** JSON Web Tokens (JWT) and bcrypt encryption with protected route fallbacks to prevent unauthorized state access.
* ⚡ **High-Contrast Modern UI:** High-legibility typography, responsive mobile-first views, zero-latency SPA routing, and resilient offline error boundaries.

---

## 🏗️ System Architecture

SkillSprint follows an enterprise **Model-View-Controller (MVC)** client-server paradigm with modular decoupling:

```mermaid
graph TD
    User([User Browser / Mobile]) -->|HTTPS / REST| CDN[Vercel Global Edge Network]
    CDN -->|Single Page App| ReactApp[React 19 Frontend Client]
    
    subgraph Frontend [Presentation Layer - React 19]
        ReactApp --> ReactRouter[React Router v7 Navigation]
        ReactApp --> ThreeCanvas[Three.js 3D Canvas & Shaders]
        ReactApp --> AuthCtx[AuthContext & JWT Session Storage]
        ReactApp --> ErrorBound[Global Error Boundary & Fallbacks]
    end

    ReactApp -->|REST API Calls / Bearer JWT| Backend[Node.js / Express Server]

    subgraph Backend [Application Layer - Express API]
        Backend --> AuthMW[JWT Authentication Middleware]
        Backend --> AICtrl[AI Controller & Prompt Parser]
        Backend --> RoadCtrl[Roadmap Controller]
        Backend --> QuizCtrl[Quiz Evaluation Controller]
    end

    AICtrl -->|Prompt Ingestion| Gemini[Google Gemini GenAI Service]
    Gemini -->|Curriculum JSON Stream| AICtrl

    subgraph Database [Data Persistence Layer - MongoDB Atlas]
        AuthMW --> UserModel[(User Collection)]
        RoadCtrl --> RoadModel[(Roadmaps Collection)]
        QuizCtrl --> QuizModel[(Quiz & Score Collection)]
    end
```

---

## 🛠️ Technology Stack

| Domain | Technology / Library | Purpose & Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19.2** | Concurrent rendering, modern hooks, and component modularity. |
| **Build Tool** | **Vite 8.0** | Instant HMR (Hot Module Replacement) and optimized production bundling. |
| **Styling & Design** | **Tailwind CSS (v3 / v4)** | Utility-first responsive design, modern white-contrast palette, and custom micro-animations. |
| **3D & Graphics** | **Three.js & Vanta.js** | Interactive 3D topology canvas, WebGL background shaders, and card-tilt effects. |
| **Routing** | **React Router v7** | Client-side declarative routing, protected routes, and catch-all redirects. |
| **Backend Runtime** | **Node.js** | Non-blocking asynchronous event loop for high I/O concurrency. |
| **Web Server Framework** | **Express.js** | REST API endpoints, CORS handling, and middleware architecture. |
| **Database** | **MongoDB Atlas & Mongoose** | Flexible schema-based NoSQL storage for complex nested roadmap curricula. |
| **Artificial Intelligence** | **Google Gemini API** | Natural language reasoning, technical prompt compilation, and question generation. |
| **Authentication** | **JWT & bcryptjs** | Stateless security tokens, salted password hashing, and role verification. |
| **DevOps & Hosting** | **Vercel & Render** | Automated GitHub CI/CD, edge distribution, and continuous deployment. |

---

## 📂 Project Structure

```bash
Skillsprint/
├── frontend/                     # React 19 Client
│   ├── public/                   # Static assets, SVG icons, shaders
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── ThreeWelcomeCanvas.jsx # Three.js WebGL interactive 3D stage
│   │   │   ├── VantaBackground.jsx    # Dynamic procedural clouds shader
│   │   │   ├── FullPageScrollShowcase.jsx # Full-page scroll showcase
│   │   │   ├── PromptStudio.jsx       # AI Prompt-to-Execution engine
│   │   │   ├── ErrorBoundary.jsx      # Global crash & chunk load fallback
│   │   │   ├── Navbar.jsx             # Responsive navigation bar
│   │   │   ├── ProtectedRoute.jsx     # Route authentication guard
│   │   │   └── CardTilt.jsx           # 3D perspective card physics
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global user state & JWT management
│   │   ├── pages/                # Application routes
│   │   │   ├── Home.jsx          # Interactive landing page
│   │   │   ├── PromptBuilderPage.jsx  # AI prompt generator studio
│   │   │   ├── Dashboard.jsx     # User sprint progress overview
│   │   │   ├── Roadmap.jsx       # 4-week dependency curriculum view
│   │   │   ├── Quiz.jsx          # Milestone evaluation system
│   │   │   ├── Login.jsx         # Sign-in authentication portal
│   │   │   └── Signup.jsx        # Account registration portal
│   │   ├── services/
│   │   │   └── api.js            # Axios client with interceptors
│   │   ├── App.jsx               # Application routes root
│   │   └── main.jsx              # DOM entrypoint
│   └── vercel.json               # SPA routing & cache revalidation rules
│
├── backend/                      # Node.js / Express API Server
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas Mongoose connection
│   ├── controllers/
│   │   ├── aiController.js       # Gemini API integration & prompt compiler
│   │   ├── authController.js     # User registration, login & validation
│   │   ├── roadmapController.js  # Roadmap persistence & retrieval
│   │   └── quizController.js     # Quiz evaluation & score recording
│   ├── models/
│   │   ├── User.js               # User authentication schema
│   │   ├── roadmap.js            # Curriculum milestone schema
│   │   └── quiz.js               # Evaluation question schema
│   ├── routes/
│   │   ├── aiRoutes.js           # Prompt-to-roadmap endpoints
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   └── dashboardRoutes.js    # Metric aggregation endpoints
│   └── server.js                 # HTTP server entrypoint
│
└── vercel.json                   # Root deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.x or higher)
* **npm** (v9.x or higher)
* **MongoDB Atlas** account (or local MongoDB daemon)
* **Google Gemini API Key** ([Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/AsadLearns/Skillsprint.git
cd Skillsprint
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server:
```bash
npm run dev
# Server running on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
# Local client running on http://localhost:5173
```

---

## 👥 Academic & Project Credits

* **Developer & Project Lead:** Asad Jiwani (PRN / Roll No: `ADT23SOCB1586`)
* **Project Guide & Mentor:** Prof. Pranjali Khadse
* **Institution:** Department of Computer Engineering / Technology

---

## 📄 License
This project is open-source and distributed under the [MIT License](LICENSE).
