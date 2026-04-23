package com.homeappliance_commerce.cart.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(Long productId, int available, int requested) {
        super("Stock insuficiente para el producto " + productId +
              ". Disponible: " + available + ", solicitado: " + requested);
    }
}
