package com.homeappliance_commerce.cart;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
@OpenAPIDefinition(
		info = @Info(
				title = "Cart Service API",
				version = "1.0.0",
				description = "API para la gestion de carritos y su relacion con productos.",
				contact = @Contact(name = "Equipo Home Appliance Commerce"),
				license = @License(name = "Uso interno")
		)
)
public class CartApplication {

	public static void main(String[] args) {
		SpringApplication.run(CartApplication.class, args);
	}

}
