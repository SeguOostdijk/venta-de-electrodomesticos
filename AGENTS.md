# AGENTS.md — Gentleman Guardian Angel

Pre-commit verification conventions for this Spring Cloud microservices project.
Every rule below must be checked before accepting a commit.

---

## Project Structure

Services: `auth-service`, `product-service`, `cart-service`, `sale-service`, `api-gateway`, `config-server`, `eureka-sv`.

---

## Rules

### 1. Package structure

Each business service must follow this layout. Violations are BLOCKING.

```
com.{company}.{service}/
├── client/       # Feign clients only (IXxxApi) — NEVER in repository/
├── controller/
├── service/      # IXxxService interface + XxxServiceImpl
├── repository/   # JPA repositories only
├── model/
├── dto/
└── exception/
```

- Feign clients placed inside `repository/` → **REJECT**
- Missing `I` prefix on service interfaces (`XxxService` instead of `IXxxService`) → **WARN**

### 2. Dependency injection

Constructor injection only. Field `@Autowired` is forbidden.

```java
// CORRECT
@Service
@RequiredArgsConstructor
public class CartService implements ICartService {
    private final ICartRepository cartRepository;
}

// WRONG — REJECT
@Service
public class CartService {
    @Autowired
    private ICartRepository cartRepository;
}
```

- Any `@Autowired` on a field → **REJECT**

### 3. Money fields

`BigDecimal` only. `Float` and `Double` cause precision errors in financial calculations.

```java
private BigDecimal price;  // CORRECT
private Float price;       // WRONG — REJECT
private Double price;      // WRONG — REJECT
```

- Any field named `price`, `total`, `amount`, `subtotal`, `discount` typed as `Float` or `Double` → **REJECT**

### 4. Feign clients

- Interface must be in `client/` package.
- Interface name must start with `I` and end with `Api` (e.g. `IProductApi`).
- `@FeignClient(name = ...)` must use the Eureka registration name (no hardcoded URLs).

```java
@FeignClient(name = "product-service")  // CORRECT — Eureka name
@FeignClient(url = "http://localhost:8081")  // WRONG — REJECT
```

- Hardcoded `url =` in `@FeignClient` → **REJECT**
- `@PathVariable` without explicit `value` in Feign interfaces → **REJECT**

### 5. Resilience4J fallbacks

- Fallback method must be in the same class as the annotated method.
- Fallback signature must match the original + `Throwable` as last parameter.
- Domain exceptions must be re-thrown; only infrastructure failures are swallowed.

```java
// CORRECT
public Cart addProductFallback(Long cartId, Long productId, int quantity, Throwable t) {
    if (t instanceof CartNotFoundException ex) throw ex;
    throw new ServiceUnavailableException("Product service unavailable.");
}
```

- Fallback that catches and silently swallows domain exceptions → **WARN**

### 6. Main application class

Any service that makes Feign calls must declare both annotations:

```java
@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
public class CartApplication { }
```

- Service has Feign clients but is missing `@EnableFeignClients` → **REJECT**
- Service registers with Eureka but is missing `@EnableDiscoveryClient` → **WARN**

### 7. Config Server YAML

Each service config file in `config-data/` must include:

- `spring.application.name` — unique, lowercase, hyphenated (e.g. `cart-service`)
- `eureka.client.service-url.defaultZone` pointing to `http://eureka-sv:8761/eureka/`
- `spring.jpa.hibernate.ddl-auto` must NOT be `create` or `create-drop` in any config file

```yaml
spring:
  application:
    name: cart-service   # unique — used by Eureka + Feign
eureka:
  client:
    service-url:
      defaultZone: http://eureka-sv:8761/eureka/
```

- `ddl-auto: create` or `ddl-auto: create-drop` present → **REJECT**
- `defaultZone` pointing to `localhost` instead of `eureka-sv` → **WARN**

### 8. Naming conventions

| Element | Convention | Example |
|---|---|---|
| Service interface | `IXxxService` | `ICartService` |
| Service impl | `XxxService` | `CartService` |
| Feign client | `IXxxApi` | `IProductApi` |
| JPA repository | `IXxxRepository` | `ICartRepository` |
| REST controller | `XxxController` | `CartController` |
| DTO | `XxxDTO` | `CartDTO` |
| Exception | `XxxException` | `CartNotFoundException` |

- Classes not following these naming patterns → **WARN**

### 9. Sensitive data

- Passwords, tokens, or API keys hardcoded in Java source files → **REJECT**
- Secrets must use `${ENV_VAR}` placeholders in YAML or environment variables.

---

## Severity levels

| Level | Action |
|---|---|
| **REJECT** | Block the commit. The issue must be fixed before proceeding. |
| **WARN** | Flag the issue in the review output but allow the commit. |
