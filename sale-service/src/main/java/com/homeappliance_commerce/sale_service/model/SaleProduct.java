package com.homeappliance_commerce.sale_service.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "SaleProduct", description = "Producto incluido dentro de una venta")
public  class SaleProduct {
    @Schema(description = "Identificador del producto", example = "21")
    private Long productId;

    @Schema(description = "Nombre del producto", example = "Heladera")
    private String name;

    @Schema(description = "Marca del producto", example = "Samsung")
    private String brand;

    @Schema(description = "Precio unitario del producto", example = "899.50")
    private BigDecimal price;

    @Schema(description = "Cantidad vendida", example = "2")
    private Integer quantity;
}