# 🏫 Task: Develop Node.js APIs for School Management

## 📑 Overview
This project provides a robust backend API system for school management with location-based features. The API allows adding schools with geographic coordinates and finding schools sorted by distance from a given location.

## ✨ Features
- ➕ Add new schools with validation
- 📍 Get schools sorted by proximity to user's location
- 🔍 Distance calculation using Haversine formula
- ✅ Input validation using Zod
- 🔒 Error handling and data validation

## 🛠️ Technologies Used
- Node.js
- Express.js
- MySQL
- Zod (validation)
- Cors
- Dotenv (environment variables)

## 📋 Prerequisites
- Node.js (v14+)
- MySQL database
- npm or yarn

## ⚙️ Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file with the following variables:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_management
   DB_SSL=false
   ```

4. **Initialize the database**
   ```bash
   npm start
   ```
   The application will automatically create the necessary tables if they don't exist.

## 🚀 Getting Started
Start the development server:
```bash
npm run dev
```

## 📡 API Endpoints

### Add a School
- **URL**: `/api/addSchool`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Example School",
    "address": "123 Education Street, City",
    "latitude": 34.0522,
    "longitude": -118.2437
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "schoolId": 1
  }
  ```

### List Schools by Distance
- **URL**: `/api/listSchools?latitude=34.0522&longitude=-118.2437`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Response**:
  ```json
  {
    "success": true,
    "count": 2,
    "schools": [
      {
        "id": 1,
        "name": "School A",
        "address": "Address A",
        "latitude": 34.0523,
        "longitude": -118.2438,
        "distance": 0.15
      },
      {
        "id": 2,
        "name": "School B",
        "address": "Address B",
        "latitude": 34.0600,
        "longitude": -118.3000,
        "distance": 5.2
      }
    ]
  }
  ```

## 💾 Database Structure
The application uses a MySQL database with the following schema:

### Schools Table
| Column    | Type          | Description                 |
|-----------|---------------|-----------------------------|
| id        | INT           | Primary key, auto increment |
| name      | VARCHAR(255)  | School name                 |
| address   | VARCHAR(255)  | School address              |
| latitude  | FLOAT         | Geographic latitude         |
| longitude | FLOAT         | Geographic longitude        |


## 🔒 Error Handling
The API implements comprehensive error handling:
- Input validation using Zod
- Database error handling
- Duplicate entry prevention

## 📝 Notes
- Distances are calculated using the Haversine formula, which accounts for the Earth's curvature
- Coordinates are validated to ensure they fall within valid ranges for latitude (-90 to 90) and longitude (-180 to 180)
- Schools with the same name are not allowed to be added twice

=
