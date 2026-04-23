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

## UI Rules (React 19 + TypeScript + Tailwind CSS 4)

These rules apply to all `*.ts` and `*.tsx` files under `ui/`.

### 10. TypeScript — no `any`

Type safety is non-negotiable. Using `any` defeats the purpose of TypeScript.

```typescript
// CORRECT
interface Product { id: number; name: string; price: number; }
function getProduct(id: number): Product { ... }

// WRONG — REJECT
function getProduct(id: any): any { ... }
```

- Any use of `: any` or `as any` → **REJECT**
- Untyped component props (no interface or type alias) → **REJECT**

### 11. TypeScript — React imports

React 19 uses named imports only. Default or namespace imports are legacy.

```typescript
// CORRECT
import { useState, useEffect, useRef } from "react";

// WRONG — REJECT
import React from "react";
import * as React from "react";
```

- `import React from "react"` or `import * as React from "react"` → **REJECT**

### 12. React 19 — no manual memoization

The React Compiler handles optimization automatically. Manual memoization is noise.

```typescript
// CORRECT — compiler optimizes this
function Component({ items }: { items: Item[] }) {
  const filtered = items.filter(x => x.active);
  const handleClick = (id: number) => console.log(id);
  return <List items={filtered} onClick={handleClick} />;
}

// WRONG
const filtered = useMemo(() => items.filter(x => x.active), [items]);
const handleClick = useCallback((id: number) => console.log(id), []);
```

- Any `useMemo(` or `useCallback(` → **WARN**

### 13. React 19 — no `forwardRef`

In React 19, `ref` is a plain prop. `forwardRef` is unnecessary and adds boilerplate.

```typescript
// CORRECT
function Input({ ref, ...props }: React.ComponentProps<"input">) {
  return <input ref={ref} {...props} />;
}

// WRONG
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input ref={ref} {...props} />
));
```

- Any `forwardRef(` → **WARN**

### 14. Tailwind — no `var()` in className

`var()` in className bypasses Tailwind's design system and causes unpredictable specificity.

```typescript
// CORRECT
<div className="bg-primary text-slate-900" />

// WRONG — REJECT
<div className="bg-[var(--color-primary)]" />
<div className="text-[var(--text-color)]" />
```

- `className` containing `var(--` → **REJECT**

### 15. Tailwind — no hex colors in className

Hex colors in className bypass the design system. Use Tailwind semantic color classes.

```typescript
// CORRECT
<p className="text-white" />
<div className="bg-slate-800" />

// WRONG
<p className="text-[#ffffff]" />
<div className="bg-[#1e293b]" />
```

- `className` containing `[#` with a hex color → **WARN**

### 16. Tailwind — `cn()` for conditional classes

String template literals or ternaries in `className` must use `cn()` to avoid merge conflicts.

```typescript
// CORRECT
<div className={cn("rounded-lg border", isActive && "border-blue-500")} />
<button className={cn("px-4 py-2", variant === "primary" && "bg-blue-600 text-white")} />

// WRONG
<div className={`rounded-lg border ${isActive ? "border-blue-500" : ""}`} />
<div className={"rounded-lg " + (isActive ? "border-blue-500" : "")} />
```

- Template literal in `className` → **WARN**
- String concatenation in `className` → **WARN**

### 17. UI project structure

Feature code must follow the `features/{domain}/` layout. Shared utilities go in `shared/`.

```
ui/src/
├── features/
│   └── {domain}/
│       ├── api/        # Axios calls / TanStack Query keys
│       ├── components/ # Domain-specific components
│       ├── hooks/      # Custom hooks (useXxx)
│       └── types.ts    # Domain types
├── pages/              # Route-level components only
├── router/             # React Router config and layouts
└── shared/             # Cross-domain utilities and components
```

- Domain components placed directly in `pages/` instead of `features/{domain}/components/` → **WARN**
- API calls made directly inside a page component (not in `api/` or a hook) → **WARN**

---

## Severity levels

| Level | Action |
|---|---|
| **REJECT** | Block the commit. The issue must be fixed before proceeding. |
| **WARN** | Flag the issue in the review output but allow the commit. |
