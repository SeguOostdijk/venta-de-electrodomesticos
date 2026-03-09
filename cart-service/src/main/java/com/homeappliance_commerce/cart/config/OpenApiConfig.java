package com.homeappliance_commerce.cart.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "API de Carritos",
                version = "v1",
                description = "API REST para gestionar carritos de compras y sus productos.",
                contact = @Contact(name = "Home Appliance Commerce"),
                license = @License(name = "Uso interno")
        ),
        tags = {
                @Tag(name = "Carritos", description = "Operaciones de gestion de carritos")
        }
)
public class OpenApiConfig {
}

