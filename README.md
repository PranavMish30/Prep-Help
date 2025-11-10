## 📚 Exam Prep Assistant

The Exam Prep Assistant is a full-stack, feature-rich web application designed to help students efficiently organize their study materials, manage their schedule, and receive personalized planning assistance powered by a Large Language Model (LLM).

Built using the **MERN stack** (MongoDB, Express, React, Node.js) with a focus on modularity and security.

-----

## ✨ Features

This application integrates several core components to create a seamless study environment:

| Category | Feature | Description |
| :--- | :--- | :--- |
| **Productivity** | **Calendar & To-Do List** | CRUD operations for tasks and events (study blocks, exams). Displays a visual schedule using `react-big-calendar`. |
| **Intelligence** | **AI Study Planner (LLM)** | Utilizes the **Gemini API** on the backend to securely generate custom study plans, subject breakdowns, and personalized planning advice based on user prompts. |
| **Resources** | **Embedded Media Viewers** | Seamlessly view external study resources using an **`<iframe>` based PDF Viewer** and a **YouTube Video Player** component. |
| **Security** | **User Authentication** | Secure user registration and login using **JWT (JSON Web Tokens)** and `bcrypt` for password hashing, ensuring data isolation between users. |

-----

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

  * **Node.js** (v18 or higher)
  * **MongoDB Atlas** Account (or local MongoDB instance)
  * **Gemini API Key** (for the LLM Planner functionality)

### 1\. Clone the Repository

```bash
git clone https://github.com/your-username/exam-prep-assistant.git
cd exam-prep-assistant/
```

### 2\. Backend Setup (`server/`)

The backend handles user authentication, data storage, and LLM communication.

```bash
cd server
npm install
```

Create a **`.env`** file in the `server/` directory and add your configuration details:

```env
# MongoDB Connection String (Replace with your Atlas or local URI)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/examprepdb?retryWrites=true&w=majority

# Secret for JWT signing
JWT_SECRET=a_very_secret_key_for_jwt_signing

# API Key for the LLM Planner
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# Server Port
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

### 3\. Frontend Setup (`client/`)

The frontend is a React application providing the user interface.

```bash
cd ../client
npm install
```

Start the React development server:

```bash
npm start
```

The application should now be accessible at `http://localhost:3000`.

-----

## 📂 Project Structure

The project follows a modular MERN architecture:

```
exam-prep-assistant/
├── client/           # React Frontend
│   ├── src/
│   │   ├── api/          # Axios services for Auth and Data
│   │   ├── components/   # Reusable UI (PDFViewer, VideoPlayer, etc.)
│   │   ├── contexts/     # Global state management (AuthContext)
│   │   └── pages/        # Main views (CalendarPage, LLMPlanner, Login)
├── server/           # Node.js/Express Backend
│   ├── config/       # Database connection
│   ├── controllers/  # API logic (authController, taskController, llmController)
│   ├── middleware/   # Security (authMiddleware - JWT protection)
│   ├── models/       # Mongoose Schemas (User, Task, Event)
│   └── routes/       # API Endpoints (/api/auth, /api/tasks, /api/llm)
└── README.md
```

-----

## 🤝 Contributing

Contributions are welcome\! If you find a bug or want to suggest a new feature (like the Spaced Repetition System), please open an issue or submit a pull request.

-----

## 📄 License

This project is licensed under the **MIT License**.

-----

*Developed by [Your Name/GitHub Handle]*