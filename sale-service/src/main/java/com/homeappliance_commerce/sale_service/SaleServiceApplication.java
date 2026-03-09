package com.homeappliance_commerce.sale_service;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@OpenAPIDefinition(
        info = @Info(
                title = "Sale Service API",
                version = "1.0.0",
                description = "API para la gestion de ventas y su relacion con carritos.",
                contact = @Contact(name = "Equipo Home Appliance Commerce"),
                license = @License(name = "Uso interno")
        )
)
public class SaleServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SaleServiceApplication.class, args);
	}

}
