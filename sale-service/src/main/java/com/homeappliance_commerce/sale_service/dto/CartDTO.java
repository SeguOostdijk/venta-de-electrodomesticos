package com.homeappliance_commerce.sale_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Schema(name = "CartDTO", description = "Representa la informacion de un carrito obtenida desde cart-service")
public class CartDTO {
    @Schema(description = "Identificador del carrito", example = "12")
    private Long id;

    @Schema(description = "Precio total acumulado del carrito", example = "1499.99")
    private BigDecimal totalPrice;

    @Schema(description = "Listado de productos que contiene el carrito")
    private List<ProductCart> products;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    @Schema(name = "CartProduct", description = "Producto dentro del carrito")
    public static class ProductCart {
        @Schema(description = "Identificador del producto", example = "21")
        private Long productId;

        @Schema(description = "Nombre del producto", example = "Microondas")
        private String name;

        @Schema(description = "Marca del producto", example = "LG")
        private String brand;

        @Schema(description = "Precio unitario del producto", example = "250.00")
        private BigDecimal price;

        @Schema(description = "Cantidad del producto", example = "1")
        private Integer quantity;
    }
}
