package com.homeappliance_commerce.product.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
@Schema(name = "Product", description = "Representa un producto comercializado")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador unico del producto", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Nombre comercial del producto", example = "Heladera No Frost 320L", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Marca del producto", example = "Samsung", requiredMode = Schema.RequiredMode.REQUIRED)
    private String brand;

    @Schema(description = "Precio unitario del producto", example = "899999.99", requiredMode = Schema.RequiredMode.REQUIRED)
    private BigDecimal price;

}
