# Visuels Server - Microservices Architecture

This project is a microservices-based server application built with Node.js and Express. The architecture consists of multiple independent services that communicate via RabbitMQ message broker.

## Project Structure

```
server/
├── auth/              # Authentication Service (Port 4001)
├── product/           # Product Service (Port 4002)
├── order/             # Order Service (Port 4003)
├── chat/              # Chat/Message Service (Port 4004)
├── jobs/              # Background Jobs Service (Port 4005)
└── docker-compose.yml # Docker orchestration
```

## Services Overview

### 1. Auth Service (Port 4001)
**Base Path:** `/api/v1/auth`

- User authentication and authorization
- Email signup/signin with OTP verification
- Google OAuth integration
- JWT token management
- User profile management

**Key Endpoints:**
- `POST /api/v1/auth/email-signup` - User registration
- `POST /api/v1/auth/email-verify` - OTP verification
- `POST /api/v1/auth/email-signin` - Email login
- `GET /api/v1/auth/me` - Get current user profile
- `GET /api/v1/auth/google` - Google OAuth login

### 2. Product Service (Port 4002)
**Base Path:** `/api/v1/products`

- Product management
- Category management
- Image upload (ImageKit integration)
- Product CRUD operations

**Key Endpoints:**
- `POST /api/v1/products/` - Create product (Artist only)
- `GET /api/v1/products/` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `PATCH /api/v1/products/:id` - Update product (Artist only)
- `DELETE /api/v1/products/:id` - Delete product (Artist only)
- `GET /api/v1/products/me/products` - Get logged artist's products

### 3. Order Service (Port 4003)
**Base Path:** `/api/v1/order`

- Order creation and management
- Cart functionality
- Order status updates
- Order history

**Key Endpoints:**
- `POST /api/v1/order/create` - Create order from cart (User only)
- `GET /api/v1/order/artist` - Get all artist orders (Artist only)
- `GET /api/v1/order/user` - Get user's orders (User only)
- `GET /api/v1/order/:id` - Get order by ID (User only)
- `PATCH /api/v1/order/:id` - Update order (Artist only)
- `DELETE /api/v1/order/:id/cancel` - Cancel order (User only)

### 4. Chat/Message Service (Port 4004)
**Base Path:** `/api/v1/message`

- Real-time messaging
- WebSocket support
- Chat management

### 5. Jobs Service (Port 4005)
**Base Path:** Internal service (no public routes)

- Background job processing
- Email notifications
- Async task handling

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Message Broker:** RabbitMQ (AMQP)
- **Authentication:** JWT, Passport.js
- **File Storage:** ImageKit
- **Containerization:** Docker

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- RabbitMQ
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository
2. Install dependencies for each service:
   ```bash
   cd auth && npm install
   cd ../product && npm install
   cd ../order && npm install
   cd ../chat && npm install
   cd ../jobs && npm install
   ```

3. Create `.env` files for each service with required environment variables

4. Start services individually or use Docker Compose:
   ```bash
   docker-compose up
   ```

### Running Services

Each service can be run independently:

```bash
# Auth Service
cd auth && npm run dev

# Product Service
cd product && npm run dev

# Order Service
cd order && npm run dev

# Chat Service
cd chat && npm run dev

# Jobs Service
cd jobs && npm run dev
```

## Architecture Patterns

- **Microservices:** Each service is independently deployable
- **Message Queue:** Services communicate asynchronously via RabbitMQ
- **Service-to-Service Authentication:** Internal service validation for inter-service communication

## Development

Each service follows a similar structure:
- `server.js` - Entry point
- `src/app.js` - Express app configuration
- `src/modules/` - Controllers, models, and routes
- `src/middlewares/` - Custom middleware
- `src/config/` - Configuration files
- `src/broker/` - RabbitMQ integration
- `src/utils/` - Utility functions

## License

ISC

