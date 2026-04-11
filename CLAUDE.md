# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands

Each microservice is a standalone Maven project. Run commands from within the service directory:

```bash
# Build a service
mvn clean package -DskipTests

# Run a service locally (requires Eureka + Config Server running first)
mvn spring-boot:run

# Run all services via Docker (preferred for full stack)
docker-compose build
docker-compose up
docker-compose down
```

No parent POM exists — each service is built independently.

## Service Ports

| Service | Port |
|---|---|
| API Gateway | 8080 |
| Product Service | 8081 |
| Cart Service | 8082 |
| Sale Service | 8083 |
| Auth Service | 8084 |
| Eureka Server | 8761 |
| Config Server | 8888 |
| MySQL | 3306 |

- Eureka dashboard: `http://localhost:8761`
- Swagger UI per service: `http://localhost:<port>/swagger-ui/index.html`

## Architecture Overview

**Infrastructure services** (must start first):
1. `mysql-db` — single MySQL 8.0 instance with 4 separate databases (`product-service`, `cart-service`, `sale-service`, auth db)
2. `eureka-sv` — Netflix Eureka service registry (standalone mode, does not register itself)
3. `config-server` — Spring Cloud Config Server backed by the `/config-data/` directory in this repo (also registered with Eureka)

**Business services** (depend on all three above):
- `product-service` — product catalog CRUD, exposes Swagger docs
- `cart-service` — shopping cart; calls `product-service` via OpenFeign
- `sale-service` — sales/orders; calls `cart-service` via OpenFeign
- `auth-service` — JWT authentication (Spring Security + JJWT); used by API Gateway for auth

**API Gateway** (`api-gateway`) sits in front of all business services, uses automatic service discovery via Eureka (`spring.cloud.gateway.discovery.locator.enabled=true`). Routes are resolved by service name.

## Configuration

All business service configuration lives in `/config-data/<service-name>.yml`. These files are served by the Config Server at startup — changes here affect running services without rebuilding images.

Database URLs use Docker service names (e.g., `jdbc:mysql://mysql-db:3306/product-service`). DDL is set to `update` (schema auto-managed by Hibernate).

Environment variables are defined in `.env`:
- `MYSQL_ROOT_PASSWORD` — MySQL root password
- `JWT_SECRET` — base64-encoded secret for JWT signing (used by auth-service)
- `GIT_USERNAME` / `GIT_PASSWORD` — credentials for Config Server's Git backend (if remote)

## Inter-service Communication

- **OpenFeign** is used for synchronous calls between services (cart→product, sale→cart).
- **Resilience4J** circuit breakers wrap Feign calls for fault tolerance.
- Services register with Eureka and discover each other by service name through Spring Cloud LoadBalancer.

## Startup Order (Docker)

Docker Compose `depends_on` + health checks enforce this order:
1. `mysql-db`
2. `eureka-sv`
3. `config-server` (waits for Eureka)
4. Business services (wait for MySQL, Eureka, Config Server)
5. `api-gateway` (waits for Eureka, Config Server)

Health checks use Spring Actuator (`/actuator/health`).

## Postman

API collections are in the `/postman/` directory for testing endpoints directly against individual services or through the gateway.