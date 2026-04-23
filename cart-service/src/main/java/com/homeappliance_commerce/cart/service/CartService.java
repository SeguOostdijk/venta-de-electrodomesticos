package com.homeappliance_commerce.cart.service;

import com.homeappliance_commerce.cart.client.IProductApi;
import com.homeappliance_commerce.cart.dto.ProductCart;
import com.homeappliance_commerce.cart.dto.ProductDTO;
import com.homeappliance_commerce.cart.exception.CartNotFoundException;
import com.homeappliance_commerce.cart.exception.InsufficientStockException;
import com.homeappliance_commerce.cart.exception.ProductNotFoundException;
import com.homeappliance_commerce.cart.exception.ServiceUnavailableException;
import com.homeappliance_commerce.cart.model.Cart;
import com.homeappliance_commerce.cart.repository.ICartRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService{

    private final ICartRepository cartRepository;
    private final IProductApi productApi;

    @Override
    public Cart createEmptyCart(Long userId) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setTotalPrice(BigDecimal.ZERO);
        cart.setProducts(new ArrayList<>());
        return cartRepository.save(cart);
    }

    @CircuitBreaker(name = "product-service", fallbackMethod = "addProductToCartFallback")
    @Retry(name = "product-service")
    @Override
    public void addProductToCart(Long cartId, Long productId, int quantity) {
        //Validate cart and product existence
        Cart selectedCart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found with id: " + cartId));
        //Fetch product details using productId (Assuming you have a ProductService to fetch product details)
        //Add product to cart and update total price
        ProductDTO selectedProduct = productApi.findById(productId);
        if (selectedProduct == null) {
            throw new ProductNotFoundException("Product not found with id: " + productId);
        }
        if (selectedProduct.getStock() == null || selectedProduct.getStock() < quantity) {
            int available = selectedProduct.getStock() == null ? 0 : selectedProduct.getStock();
            throw new InsufficientStockException(productId, available, quantity);
        }
        selectedCart.getProducts().stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .ifPresentOrElse(
                        existing -> existing.setQuantity(existing.getQuantity() + quantity),
                        () -> selectedCart.getProducts().add(new ProductCart(
                                selectedProduct.getId(), selectedProduct.getName(),
                                selectedProduct.getBrand(), selectedProduct.getPrice(), quantity))
                );
        selectedCart.setTotalPrice(selectedCart.getTotalPrice()
                .add(selectedProduct.getPrice().multiply(BigDecimal.valueOf(quantity))));
        cartRepository.save(selectedCart);
    }

    public void addProductToCartFallback(Long cartId, Long productId, int quantity, Throwable t) {
        if (t instanceof CartNotFoundException ex) throw ex;
        if (t instanceof ProductNotFoundException ex) throw ex;
        if (t instanceof InsufficientStockException ex) throw ex;
        throw new ServiceUnavailableException("Product service is unavailable. Please try again later.");
    }

    @Override
    public void removeProductFromCart(Long cartId, Long productId) {
        Cart selectedCart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found with id: " + cartId));
        ProductCart productToRemove = selectedCart.getProducts().stream()
                .filter(productCart -> productCart.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ProductNotFoundException("Product not found in cart with id: " + productId));
        selectedCart.getProducts().remove(productToRemove);
        selectedCart.setTotalPrice(selectedCart.getTotalPrice().subtract(productToRemove.getPrice().multiply(BigDecimal.valueOf(productToRemove.getQuantity()))));
        cartRepository.save(selectedCart);
    }

    @Override
    public void clearCart(Long cartId) {
        Cart selectedCart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found with id: " + cartId));
        selectedCart.getProducts().clear();
        selectedCart.setTotalPrice(BigDecimal.ZERO);
        cartRepository.save(selectedCart);
    }

    @Override
    public Cart getCartById(Long cartId) {
        return cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found with id: " + cartId));
    }

    @Override
    public Cart getOrCreateCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> createEmptyCart(userId));
    }

    @Override
    public void updateProductQuantity(Long cartId, Long productId, int quantity) {
        Cart selectedCart = cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found with id: " + cartId));
        ProductCart existing = selectedCart.getProducts().stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ProductNotFoundException("Product not found in cart with id: " + productId));
        BigDecimal oldSubtotal = existing.getPrice().multiply(BigDecimal.valueOf(existing.getQuantity()));
        if (quantity <= 0) {
            selectedCart.getProducts().remove(existing);
            selectedCart.setTotalPrice(selectedCart.getTotalPrice().subtract(oldSubtotal));
        } else {
            BigDecimal newSubtotal = existing.getPrice().multiply(BigDecimal.valueOf(quantity));
            existing.setQuantity(quantity);
            selectedCart.setTotalPrice(selectedCart.getTotalPrice().subtract(oldSubtotal).add(newSubtotal));
        }
        cartRepository.save(selectedCart);
    }
}
