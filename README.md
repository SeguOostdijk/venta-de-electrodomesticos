# Comercio de Electrodomésticos – API de Microservicios

Sistema de gestión para una tienda online de **electrodomésticos**, desarrollado mediante una **arquitectura de microservicios** utilizando **Spring Cloud**.

El sistema permite consultar productos, gestionar carritos de compra y registrar ventas, proporcionando una experiencia de compra distribuida mediante diferentes servicios que se comunican entre sí.

Este proyecto fue desarrollado como **Trabajo Práctico Integrador Final** del curso **Microservicios con Spring Cloud** de **TodoCode Academy**, con el objetivo de demostrar conocimientos en desarrollo de microservicios, comunicación entre servicios y despliegue mediante Docker.

---

# Arquitectura del sistema

El sistema está compuesto por varios microservicios independientes que colaboran entre sí para ofrecer las funcionalidades del sistema.

Microservicios principales:

### Product Service

Microservicio encargado de administrar los productos disponibles en la tienda.
Permite consultar los electrodomésticos disponibles junto con su información básica.

### Cart Service

Microservicio encargado de gestionar los carritos de compra.
Permite agregar y eliminar productos del carrito y calcular el total de la compra.

### Sale Service

Microservicio encargado de registrar las ventas realizadas.
Cada venta se encuentra asociada a un carrito de compras.

Infraestructura de microservicios:

Eureka Server → Registro y descubrimiento de servicios

API Gateway → Punto de entrada para clientes externos

Config Server → Centralización de configuraciones

Spring Cloud LoadBalancer → Balanceo de carga entre instancias

Resilience4J → Circuit Breaker y Retry para tolerancia a fallos

---

# Tecnologías utilizadas

* Java 23
* Spring Boot
* Spring Cloud
* Spring Data JPA
* Hibernate
* MySQL
* Docker
* Eureka Server
* API Gateway
* Config Server
* Resilience4J
* OpenAPI / Swagger
* Postman
* Maven

---

# Estructura del proyecto

```
homeappliance-commerce
│
├── api-gateway
├── config-server
├── eureka-sv
│
├── product-service
├── cart-service
├── sale-service
│
├── docker-compose.yml
│
└── postman
    ├── product-service_collection.json
    ├── cart-service_collection.json
    ├── sale-service_collection.json
```

---

# Ejecutar la aplicación con Docker

### 1. Clonar el repositorio

```
git clone https://github.com/tu-usuario/homeappliance-commerce.git
cd homeappliance-commerce
```

---

### 2. Construir los contenedores

```
docker-compose build
```

---

### 3. Levantar el sistema

```
docker-compose up
```

Esto iniciará automáticamente:

* MySQL
* Eureka Server
* Config Server
* API Gateway
* Product Service
* Cart Service
* Sale Service

---

# Acceso a los servicios

### Eureka Dashboard

```
http://localhost:8761
```

### API Gateway

```
http://localhost:8080
```

---

# Documentación de la API (Swagger)

Cada microservicio expone documentación interactiva mediante **Swagger (OpenAPI)**.

Product Service

```
http://localhost:8081/swagger-ui/index.html
```

Cart Service

```
http://localhost:8082/swagger-ui/index.html
```

Sale Service

```
http://localhost:8083/swagger-ui/index.html
```

Desde Swagger es posible:

* visualizar todos los endpoints disponibles
* probar peticiones HTTP (GET, POST, PUT, DELETE)
* revisar los modelos de datos utilizados

---

# Probar la API con Postman

El repositorio incluye colecciones de Postman para probar los endpoints de cada microservicio.

Pasos:

1. Abrir Postman
2. Importar las colecciones ubicadas en

```
/postman
```

3. Ejecutar las peticiones disponibles en cada colección.

---

# Docker

Cada microservicio posee su propio **Dockerfile** y el sistema completo se ejecuta mediante **docker-compose**, lo que permite levantar toda la arquitectura de microservicios con un solo comando.

---

# Autor

Segundo Oostdijk
Desarrollador Backend

Proyecto desarrollado para el curso:

**Microservicios con Spring Cloud – TodoCode Academy**
