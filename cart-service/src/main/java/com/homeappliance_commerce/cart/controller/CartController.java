package com.homeappliance_commerce.cart.controller;

import com.homeappliance_commerce.cart.dto.ApiError;
import com.homeappliance_commerce.cart.model.Cart;
import com.homeappliance_commerce.cart.service.ICartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@Tag(name = "Carritos", description = "Operaciones de gestion de carritos")
@RequiredArgsConstructor
public class CartController {

   private final ICartService cartService;

    @Operation(summary = "Agregar producto al carrito", description = "Agrega un producto con una cantidad determinada al carrito indicado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Producto agregado al carrito"),
            @ApiResponse(responseCode = "404", description = "Carrito o producto no encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "503", description = "Servicio de productos no disponible",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping("/{cartId}/products")
    public ResponseEntity<Void> addProductToCart(
            @Parameter(description = "Identificador del carrito", example = "1") @PathVariable Long cartId,
            @Parameter(description = "Identificador del producto", example = "10") @RequestParam Long productId,
            @Parameter(description = "Cantidad a agregar", example = "2") @RequestParam(defaultValue = "1") int quantity) {
        cartService.addProductToCart(cartId, productId, quantity);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Quitar producto del carrito", description = "Elimina un producto especifico del carrito indicado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Producto eliminado del carrito"),
            @ApiResponse(responseCode = "404", description = "Carrito o producto no encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{cartId}/products/{productId}")
    public ResponseEntity<Void> removeProductFromCart(
            @Parameter(description = "Identificador del carrito", example = "1") @PathVariable Long cartId,
            @Parameter(description = "Identificador del producto", example = "10") @PathVariable Long productId) {
        cartService.removeProductFromCart(cartId, productId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Vaciar carrito", description = "Elimina todos los productos del carrito indicado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Carrito vaciado correctamente"),
            @ApiResponse(responseCode = "404", description = "Carrito no encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{cartId}/products")
    public ResponseEntity<Void> clearCart(
            @Parameter(description = "Identificador del carrito", example = "1") @PathVariable Long cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Obtener carrito por id", description = "Devuelve el detalle del carrito con sus productos y total acumulado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Carrito encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Cart.class))),
            @ApiResponse(responseCode = "404", description = "Carrito no encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/{cartId}")
    public ResponseEntity<Cart> getCartById(
            @Parameter(description = "Identificador del carrito", example = "1") @PathVariable Long cartId) {
        return ResponseEntity.ok(cartService.getCartById(cartId));
    }

    @Operation(summary = "Obtener o crear carrito del usuario", description = "Devuelve el carrito asociado al usuario. Si no existe, crea uno nuevo vacio.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Carrito encontrado o creado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Cart.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/user")
    public ResponseEntity<Cart> getOrCreateCartByUser(
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(cartService.getOrCreateCartByUserId(userId));
    }
}
