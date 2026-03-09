package com.homeappliance_commerce.cart.model;

import com.homeappliance_commerce.cart.dto.ProductCart;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Schema(description = "Recurso carrito de compras")
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador del carrito", example = "1")
    private Long id;

    @Schema(description = "Precio total acumulado del carrito", example = "2499.99")
    private Float totalPrice;

    @ElementCollection
    @CollectionTable(name = "cart_products", joinColumns = @JoinColumn(name = "cart_id"))
    @ArraySchema(schema = @Schema(implementation = ProductCart.class), arraySchema = @Schema(description = "Productos contenidos en el carrito"))
    private List<ProductCart> products;
}
