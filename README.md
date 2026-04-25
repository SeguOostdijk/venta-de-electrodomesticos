# HomeAppliance Commerce

Full-stack e-commerce platform for home appliances built with a **microservices architecture** using **Spring Cloud** and a **React 19** frontend.

The system handles user authentication, product catalog, shopping cart, order management, and AI-powered sales analysis — all orchestrated through an API Gateway with service discovery, centralized configuration, and fault tolerance.

---

## Architecture

```
                        ┌─────────────────┐
                        │   React 19 UI   │  :5173
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │   API Gateway   │  :8080  (JWT validation + routing)
                        └────────┬────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
   ┌──────▼──────┐       ┌───────▼──────┐      ┌───────▼──────┐
   │auth-service │       │product-serv. │      │ cart-service │
   │   :8084     │       │    :8081     │      │    :8082     │
   └─────────────┘       └──────────────┘      └──────────────┘
          │                      │                      │
   ┌──────▼──────┐       ┌───────▼──────┐
   │sale-service │       │  ai-service  │
   │   :8083     │       │    :8085     │  (Groq LLM)
   └─────────────┘       └──────────────┘
          │
   ┌──────▼──────────────────────────────────┐
   │              Eureka Server  :8761        │
   │              Config Server  :8888        │
   │              MySQL          :3306        │
   └─────────────────────────────────────────┘
```

---

## Services

| Service | Port | Description |
|---|---|---|
| `ui` | 5173 | React 19 frontend — user and admin interfaces |
| `api-gateway` | 8080 | Entry point — JWT validation, routing, CORS |
| `auth-service` | 8084 | Registration, login, JWT issuance |
| `product-service` | 8081 | Product catalog with search and pagination |
| `cart-service` | 8082 | Shopping cart management |
| `sale-service` | 8083 | Order placement and history |
| `ai-service` | 8085 | Sales analysis powered by Groq LLM |
| `eureka-sv` | 8761 | Service registry and discovery |
| `config-server` | 8888 | Centralized configuration |

---

## Features

**User**
- Register and login with JWT authentication
- Browse product catalog with search and pagination
- Add products to cart, adjust quantities
- Place orders and view order history

**Admin**
- Manage products (create, edit, delete)
- View and manage all sales
- AI-powered sales analysis via Groq

---

## Tech Stack

**Backend**
- Java 23 · Spring Boot · Spring Cloud
- Spring Security · JWT
- Spring Data JPA · Hibernate · MySQL
- OpenFeign · Resilience4J (Circuit Breaker + Retry)
- Eureka · Config Server · API Gateway
- Spring AI (Groq) · OpenAPI / Swagger

**Frontend**
- React 19 · TypeScript · Vite
- Tailwind CSS 4 · shadcn/ui
- React Router v7 · TanStack Query
- Axios · Playwright (E2E tests)

**Infrastructure**
- Docker · Docker Compose
- Nginx (frontend serving)
- phpMyAdmin

---

## Getting Started

### Prerequisites

- Docker and Docker Compose
- A [Groq API key](https://console.groq.com) (free tier available)

### 1. Clone the repository

```bash
git clone https://github.com/SeguOostdijk/venta-de-electrodomesticos.git
cd homeappliance-commerce
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
MYSQL_ROOT_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
```

### 3. Start the system

```bash
docker-compose up --build
```

This starts all services in the correct dependency order with health checks.

---

## Accessing the Application

| Interface | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API Gateway | http://localhost:8080 |
| Eureka Dashboard | http://localhost:8761 |
| phpMyAdmin | http://localhost:8090 |

### Swagger (per service)

| Service | Swagger UI |
|---|---|
| product-service | http://localhost:8081/swagger-ui/index.html |
| cart-service | http://localhost:8082/swagger-ui/index.html |
| sale-service | http://localhost:8083/swagger-ui/index.html |
| auth-service | http://localhost:8084/swagger-ui/index.html |

---

## Project Structure

```
homeappliance-commerce/
├── api-gateway/
├── config-server/
├── eureka-sv/
├── auth-service/
├── product-service/
├── cart-service/
├── sale-service/
├── ai-service/
├── ui/                    # React 19 frontend
├── config-data/           # Centralized config files
├── mysql-init/            # DB initialization scripts
├── postman/               # Postman collections
└── docker-compose.yml
```

---

## API Collections

Postman collections for all services are available in `/postman`.

Import any collection and point it to `http://localhost:8080` (API Gateway).

---

## Author

**Segundo Oostdijk** — [@SeguOostdijk](https://github.com/SeguOostdijk)
