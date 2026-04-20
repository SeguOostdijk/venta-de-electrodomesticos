package com.homeappliance_commerce.cart.service;

import com.homeappliance_commerce.cart.model.Cart;

public interface ICartService {
    Cart createEmptyCart(Long userId);
    void addProductToCart(Long cartId, Long productId, int quantity);
    void removeProductFromCart(Long cartId, Long productId);
    void clearCart(Long cartId);
    Cart getCartById(Long cartId);
    Cart getOrCreateCartByUserId(Long userId);
}
