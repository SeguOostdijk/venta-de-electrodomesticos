package com.venta_de_electrodomesticos.auth_service.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;
import com.venta_de_electrodomesticos.auth_service.service.JwtService;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);                                        //Si no hay header o no empieza con Bearer, deja pasar sin autenticar. No lanza error acá. Si el endpoint era protegido, Spring Security lo rechazará despues.
            return;
        }

        String token = authHeader.substring(7);

        if (!jwtService.isTokenValid(token)) {                                              //Si no es valido el token, esta vencido o ses inválido, deja pasar sin autenticar, Spring Security lo rechazará
            filterChain.doFilter(request, response);
            return;
        }

        String email = jwtService.extractEmail(token);

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {                              //Si el usuario existe y no esta autenticado
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(                   //Crea un objeto de autenticación. Spring lo utiliza para saber si el usuario esta autenticado o no.
                    email,
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_" + jwtService.extractRole(token)))
            );
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));                      //Agrega detalles del request (IP, etc)
            SecurityContextHolder.getContext().setAuthentication(authentication);                                               //A partir de acá el usuario save que el usuario esta autenticado para esta request
        }

        filterChain.doFilter(request, response);
    }
}
