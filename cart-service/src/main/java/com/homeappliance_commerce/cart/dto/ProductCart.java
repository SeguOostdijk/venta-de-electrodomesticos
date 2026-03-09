package com.homeappliance_commerce.cart.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@Schema(description = "Instantanea de producto almacenada dentro del carrito")
public class ProductCart {

    @Schema(description = "Identificador del producto", example = "10")
    private Long id;

    @Schema(description = "Nombre del producto", example = "Smart TV 50")
    private String name;

    @Schema(description = "Marca del producto", example = "Samsung")
    private String brand;

    @Schema(description = "Precio unitario", example = "999.99")
    private Float price;

    @Schema(description = "Cantidad agregada al carrito", example = "2")
    private int quantity;
}
