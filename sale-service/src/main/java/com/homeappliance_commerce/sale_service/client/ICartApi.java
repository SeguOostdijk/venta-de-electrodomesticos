package com.homeappliance_commerce.sale_service.client;

import com.homeappliance_commerce.sale_service.dto.CartDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cart-service")
public interface ICartApi {
    @GetMapping("/carts/{cartId}")
    CartDTO getCartById(@PathVariable Long cartId);

    @DeleteMapping("/carts/{cartId}/products")
    void clearCart(@PathVariable Long cartId);
}
