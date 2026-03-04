package com.homeappliance_commerce.cart.controller;

import com.homeappliance_commerce.cart.model.Cart;
import com.homeappliance_commerce.cart.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
public class CartController {

   @Autowired
   private ICartService cartService;

    @PostMapping
    public ResponseEntity<Cart> createEmptyCart() {
        Cart createdCart = cartService.createEmptyCart();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCart);
    }

    @PostMapping("/{cartId}/products")
    public ResponseEntity<Void> addProductToCart(@PathVariable Long cartId,
                                                 @RequestParam Long productId,
                                                 @RequestParam(defaultValue = "1") int quantity) {
        cartService.addProductToCart(cartId, productId, quantity);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{cartId}/products/{productId}")
    public ResponseEntity<Void> removeProductFromCart(@PathVariable Long cartId,
                                                      @PathVariable Long productId) {
        cartService.removeProductFromCart(cartId, productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{cartId}/products")
    public ResponseEntity<Void> clearCart(@PathVariable Long cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long cartId) {
        return ResponseEntity.ok(cartService.getCartById(cartId));
    }
}
