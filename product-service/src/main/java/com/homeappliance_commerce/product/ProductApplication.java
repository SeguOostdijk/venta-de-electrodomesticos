package com.homeappliance_commerce.product;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
@OpenAPIDefinition(
        info = @Info(
                title = "Product Service API",
                version = "1.0.0",
                description = "API para la gestion de productos del comercio de electrodomesticos",
                contact = @Contact(name = "Equipo Home Appliance Commerce"),
                license = @License(name = "Uso interno")
        )
)
public class ProductApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductApplication.class, args);
	}

}
