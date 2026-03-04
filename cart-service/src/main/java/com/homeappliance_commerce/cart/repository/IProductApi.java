package com.homeappliance_commerce.cart.repository;

import com.homeappliance_commerce.cart.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "product-service")
public interface IProductApi {
    @GetMapping("/products/{id}")
    public ProductDTO findById(Long id);
}
