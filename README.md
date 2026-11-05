# 🌾 KisanFleet
### Smart Agricultural Equipment Sharing & Fleet Optimization Network

KisanFleet is a digital platform designed to improve access to agricultural equipment by helping farmers, cooperatives, and equipment operators coordinate machinery sharing and management.

The platform aims to reduce equipment accessibility challenges and support efficient agricultural resource utilization.

## 🎯 Problem Statement

Many farmers face difficulties accessing agricultural machinery when they need it. Purchasing expensive equipment may not be affordable for every farmer.

KisanFleet aims to address this problem by providing a centralized platform for equipment discovery, booking coordination, operator management, and payment settlement tracking.

## 💡 Our Solution

KisanFleet provides a digital interface where agricultural equipment can be managed and coordinated through a single platform.

The project focuses on making agricultural equipment sharing more accessible, organized, and efficient.

## ✨ Key Features

- **Dashboard:** Overview of the agricultural equipment sharing platform.
- **Equipment Management:** View and manage agricultural equipment.
- **Booking Management:** Interface for equipment booking coordination.
- **Operator Coordination:** Manage and coordinate equipment operators.
- **Payment Settlement:** Interface for payment settlement tracking.
- **Responsive Interface:** Modern web interface built with React and TypeScript.
- **Database Integration:** MongoDB Atlas connection through the backend.

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- MongoDB Atlas

### Development Tools
- Visual Studio Code
- Git
- GitHub
- npm

## 🏗️ Project Architecture

The application follows a frontend-backend architecture.

- **Frontend:** Provides the user interface and application screens.
- **Backend:** Handles API requests using Express.js.
- **Database:** MongoDB Atlas is configured for database connectivity.

## 🚀 Getting Started

### Prerequisites

Install the following:

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd KisanFleet
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root.

5. Configure the required environment variables using `.env.example` as a reference.

   ```env
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DATABASE=kisanfleet
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open your browser:

   ```text
   http://localhost:3000
   ```

## 🗄️ Database

KisanFleet uses MongoDB Atlas for database connectivity.

The backend health endpoint can be accessed at:

```text
http://localhost:3000/api/health
```

The database connection has been verified during development.

## 🌱 Future Enhancements

- Real-time agricultural equipment availability.
- Improved booking and reservation workflows.
- Secure payment gateway integration.
- GPS-based equipment tracking.
- Notifications for farmers and operators.
- Advanced fleet optimization.
- Deployment to a public cloud platform.

## 👨‍💻 Project Information

**Project Name:** KisanFleet

**Category:** Agriculture Technology / AgriTech

**Purpose:** Agricultural Equipment Sharing and Fleet Optimization

**Developed for:** Hackathon Project

## 🤝 Contribution

This project is developed as an agricultural technology solution.

Contributions, suggestions, and feedback are welcome.

## 📄 License

This project is currently developed for demonstration and educational purposes.

A suitable open-source license can be added in the future.
