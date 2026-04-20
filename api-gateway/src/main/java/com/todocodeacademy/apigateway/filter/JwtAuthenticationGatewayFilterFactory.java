package com.todocodeacademy.apigateway.filter;

import com.todocodeacademy.apigateway.security.JwtUtil;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class JwtAuthenticationGatewayFilterFactory extends AbstractGatewayFilterFactory<JwtAuthenticationGatewayFilterFactory.Config> {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationGatewayFilterFactory(JwtUtil jwtUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public List<String> shortcutFieldOrder() {
        return List.of("requiredRole");
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return writeErrorResponse(exchange.getResponse(), HttpStatus.UNAUTHORIZED, "Encabezado de autorización ausente o inválido");
            }

            String token = authHeader.substring(7);

            if (!jwtUtil.isTokenValid(token)) {
                return writeErrorResponse(exchange.getResponse(), HttpStatus.UNAUTHORIZED, "Token inválido o expirado");
            }

            String role = jwtUtil.extractRole(token);
            if (config.getRequiredRole() != null && !hasRequiredRole(role, config.getRequiredRole())) {
                return writeErrorResponse(exchange.getResponse(), HttpStatus.FORBIDDEN, "Acceso denegado: permisos insuficientes");
            }

            String userId = jwtUtil.extractUserId(token);
            return chain.filter(exchange.mutate()
                    .request(r -> r.header("X-User-Id", userId)
                                   .header("X-User-Role", role))
                    .build());
        };
    }

    // ADMIN is a superset of USER — any role satisfies a lower or equal required role
    private boolean hasRequiredRole(String userRole, String requiredRole) {
        if ("ADMIN".equals(userRole)) return true;
        return userRole.equals(requiredRole);
    }

    private Mono<Void> writeErrorResponse(org.springframework.http.server.reactive.ServerHttpResponse response, HttpStatus status, String message) {
        response.setStatusCode(status);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"error\": \"" + message + "\"}";
        DataBuffer buffer = response.bufferFactory().wrap(body.getBytes(StandardCharsets.UTF_8));
        return response.writeWith(Mono.just(buffer));
    }

    public static class Config {
        private String requiredRole;

        public String getRequiredRole() {
            return requiredRole;
        }

        public void setRequiredRole(String requiredRole) {
            this.requiredRole = requiredRole;
        }
    }
}