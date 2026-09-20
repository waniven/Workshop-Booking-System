# Workshop Management System

This project is a full stack application for COMP713.
The project that I developed is a workshop booking system. The goal of this system is to provide an easy way to create and manage booked appointments for workshop mechanics.
The system allows for easy management of service bookings, vehicles, and contacts to help manage and gain an insight into appointments.

---

## System Architecture & Ports

When the containers are running, the application maps services onto your host machine using the following ports:

- Frontend Website: http://localhost:3001
- Backend API: http://localhost:3000
- MongoDB Database: mongodb://localhost:27017

---

## Getting Started

### Prerequisites

- Docker

### Installation and Execution

1. Navigate to the root directory containing the docker-compose.yml file.
2. Build and start the application stack by running the following command in your terminal:
   ```bash
   docker compose up --build
   ```
3. Once the terminal displays that the containers are online, open your web browser and navigate to:
   http://localhost:3001

---

## Stopping the Application

To safely spin down the containers and free up network ports on your machine, press Ctrl + C in the running terminal window, or run the following command from the root directory:

```bash
docker compose down
```

---

## Troubleshooting & Common Port Fixes

### 1. Apple Silicon (M1/M2/M3 Mac) Compatibility

This project is configured to use MongoDB 7.0 (mongo:7.0). MongoDB 8.0+ has a known allocator conflict with recent Docker Desktop kernels on Apple ARM architecture.

### 2. Docker Ignoring Code or package.json Updates

If you modify dependency files or configurations and Docker fails to register them, force a clean rebuild to bypass the internal image cache layers:

```bash
# Remove tracking configurations and stop containers
docker compose down --remove-orphans

# Build from scratch without using cached layers
docker compose build --no-cache

# Start the services fresh
docker compose up
```

---

## Project Directory Structure

```text
workshop_management_system/
├── README.md
├── backend
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── controllers
│       │   ├── bookingController.js
│       │   ├── contactController.js
│       │   ├── partController.js
│       │   └── vehicleController.js
│       ├── middleware
│       │   └── validate.js
│       ├── models
│       │   ├── bookingModel.js
│       │   ├── contactModel.js
│       │   ├── partModel.js
│       │   └── vehicleModel.js
│       ├── server.js
│       ├── services
│       │   ├── bookingService.js
│       │   ├── contactService.js
│       │   ├── partService.js
│       │   └── vehicleService.js
│       └── validations
│           ├── bookingValidation.js
│           ├── contactValidation.js
│           ├── partValidation.js
│           └── vehicleValidation.js
├── docker-compose.yml
└── frontend
    ├── Dockerfile
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── hero.png
    │   │   ├── react.svg
    │   │   └── vite.svg
    │   ├── components
    │   │   ├── BookingDetailComponent.jsx
    │   │   ├── BookingFormComponent.jsx
    │   │   ├── BookingListComponent.jsx
    │   │   ├── ContactDetailComponent.jsx
    │   │   ├── ContactFormComponent.jsx
    │   │   ├── ContactsListComponent.jsx
    │   │   ├── DBDropdown.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── PartFormComponent.jsx
    │   │   ├── VehicleFormComponent.jsx
    │   │   └── VehicleListComponent.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── utils
    │       └── validatorUtil.js
    └── vite.config.js
```
