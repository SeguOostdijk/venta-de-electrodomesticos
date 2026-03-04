# 🧪 Pruebas Manuales - ProductController

## Requisitos Previos
```bash
# Iniciar la aplicación
./mvnw spring-boot:run
```

## 🔍 Pruebas con cURL

### 1. Crear un producto (POST) - Debe retornar 201 CREATED
```bash
curl -X POST http://localhost:8080/products `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Refrigerador\",\"brand\":\"Samsung\",\"price\":1200.50}'
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Refrigerador",
  "brand": "Samsung",
  "price": 1200.50
}
```
**Código:** `201 Created`

---

### 2. Buscar producto por ID (GET) - Debe retornar 200 OK
```bash
curl http://localhost:8080/products/1
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Refrigerador",
  "brand": "Samsung",
  "price": 1200.50
}
```
**Código:** `200 OK`

---

### 3. Buscar producto inexistente (GET) - Debe retornar 404 NOT FOUND
```bash
curl http://localhost:8080/products/999
```

**Respuesta esperada:**
```json
{
  "timestamp": "2026-03-03T...",
  "status": 404,
  "error": "Not Found",
  "message": "Producto no encontrado con ID: 999",
  "path": "/products/999"
}
```
**Código:** `404 Not Found` ✅ **Este es el manejo de excepciones funcionando**

---

### 4. Actualizar producto (PUT) - Debe retornar 200 OK
```bash
curl -X PUT "http://localhost:8080/products?id=1" `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Refrigerador Premium\",\"brand\":\"Samsung\",\"price\":1500.00}'
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Refrigerador Premium",
  "brand": "Samsung",
  "price": 1500.00
}
```
**Código:** `200 OK`

---

### 5. Intentar actualizar producto inexistente - Debe retornar 404
```bash
curl -X PUT "http://localhost:8080/products?id=999" `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test\",\"brand\":\"Test\",\"price\":100.00}'
```

**Respuesta esperada:**
```json
{
  "timestamp": "2026-03-03T...",
  "status": 404,
  "error": "Not Found",
  "message": "Producto no encontrado con ID: 999",
  "path": "/products"
}
```
**Código:** `404 Not Found` ✅

---

### 6. Buscar múltiples productos por IDs (GET)
```bash
curl "http://localhost:8080/products?ids=1,2,3"
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "name": "Refrigerador Premium",
    "brand": "Samsung",
    "price": 1500.00
  }
]
```
**Código:** `200 OK`

---

### 7. Eliminar producto (DELETE) - Debe retornar 200 OK
```bash
curl -X DELETE "http://localhost:8080/products?id=1"
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Refrigerador Premium",
  "brand": "Samsung",
  "price": 1500.00
}
```
**Código:** `200 OK`

---

### 8. Intentar eliminar producto ya eliminado - Debe retornar 404
```bash
curl -X DELETE "http://localhost:8080/products?id=1"
```

**Respuesta esperada:**
```json
{
  "timestamp": "2026-03-03T...",
  "status": 404,
  "error": "Not Found",
  "message": "Producto no encontrado con ID: 1",
  "path": "/products"
}
```
**Código:** `404 Not Found` ✅

---

## 🎯 Verificación de Mejoras

### ✅ ResponseEntity funcionando
- Todos los endpoints retornan códigos HTTP correctos
- POST retorna `201 Created`
- GET/PUT/DELETE retornan `200 OK`

### ✅ GlobalExceptionHandler funcionando
- Productos inexistentes retornan `404 Not Found`
- Respuestas de error tienen estructura consistente
- Incluyen timestamp, status, error, message y path

### ✅ Validaciones funcionando
- Productos no encontrados lanzan excepciones
- Las excepciones son capturadas globalmente
- Respuestas JSON formateadas correctamente

---

## 🔧 Alternativa: Pruebas con Postman/Insomnia

Importa esta colección o crea manualmente:

1. **POST** `http://localhost:8080/products`
2. **GET** `http://localhost:8080/products/1`
3. **GET** `http://localhost:8080/products/999` (debe fallar)
4. **PUT** `http://localhost:8080/products?id=1`
5. **DELETE** `http://localhost:8080/products?id=1`

---
✨ **Recuerda:** Si estás usando PowerShell, las comillas dobles en JSON deben escaparse con `\`

