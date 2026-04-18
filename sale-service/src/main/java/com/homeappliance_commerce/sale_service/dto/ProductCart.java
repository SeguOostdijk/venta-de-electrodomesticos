package com.homeappliance_commerce.sale_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Schema(name = "ProductCartDTO", description = "Producto perteneciente a un carrito")
public class ProductCart {
    @Schema(description = "Identificador del producto", example = "21")
    private  Long id;

    @Schema(description = "Nombre del producto", example = "Lavarropas")
    private String name;

    @Schema(description = "Marca del producto", example = "Whirlpool")
    private String brand;

    @Schema(description = "Precio unitario", example = "780.00")
    private BigDecimal price;

    @Schema(description = "Cantidad del producto", example = "1")
    private int quantity;
}
