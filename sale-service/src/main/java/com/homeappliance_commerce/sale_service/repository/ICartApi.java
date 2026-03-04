package com.homeappliance_commerce.sale_service.repository;

import com.homeappliance_commerce.sale_service.dto.CartDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cart-service")
public interface ICartApi {
    @GetMapping("/carts/{cartId}")
    public CartDTO getCartById(@PathVariable Long cartId);
}
