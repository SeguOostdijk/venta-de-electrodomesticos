# Endpoints — Microservicios Venta de Electrodomésticos

| Servicio | Puerto | Base URL |
|----------|--------|---------|
| auth-service | 8084 | `/api/auth` |
| product-service | 8081 | `/products` |
| cart-service | 8082 | `/carts` |
| sale-service | 8083 | `/sales` |
| api-gateway | 8080 | — |

---

## auth-service (8084)

| Método | Endpoint | Descripción |
|--------|----------|------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/refresh` | Refrescar token |
| POST | `/api/auth/logout` | Cerrar sesión |
| GET | `/api/auth/me` | Obtener perfil actual |
| PUT | `/api/auth/me` | Actualizar perfil |
| GET | `/api/auth/users/{id}` | Obtener usuario por ID *(internal)* |

---

## product-service (8081)

| Método | Endpoint | Descripción |
|--------|----------|------------|
| GET | `/products/{id}` | Obtener producto por ID |
| GET | `/products` | Listar todos (paginado) |
| GET | `/products/batch?ids=1,2,3` | Obtener múltiples por IDs |
| GET | `/products/search?q=samsung` | Buscar por nombre o marca (paginado) |
| POST | `/products` | Crear producto |
| PUT | `/products?id=1` | Actualizar producto |
| DELETE | `/products?id=1` | Eliminar producto |

---

## cart-service (8082)

| Método | Endpoint | Descripción |
|--------|----------|------------|
| POST | `/carts/{cartId}/products?productId=10&quantity=2` | Agregar producto |
| DELETE | `/carts/{cartId}/products/{productId}` | Quitar producto |
| DELETE | `/carts/{cartId}/products` | Vaciar carrito |
| GET | `/carts/{cartId}` | Obtener carrito por ID |
| GET | `/carts/user` | Obtener o crear carrito del usuario autenticado *(header: X-User-Id)* |

---

## sale-service (8083)

| Método | Endpoint | Descripción |
|--------|----------|------------|
| POST | `/sales/{cartId}` | Crear venta desde carrito |
| GET | `/sales` | Listar todas las ventas |
| GET | `/sales/{id}` | Obtener venta por ID |
| GET | `/sales/date/{date}` | Listar ventas por fecha `(yyyy-MM-dd)` |
| DELETE | `/sales/{id}` | Eliminar venta |
| GET | `/sales/my` | Listar ventas del usuario autenticado *(header: X-User-Id)* |