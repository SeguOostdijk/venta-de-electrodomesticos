package com.homeappliance_commerce.cart.client;

import com.homeappliance_commerce.cart.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service")
public interface IProductApi {
    @GetMapping("/products/{id}")
    ProductDTO findById(@PathVariable("id") Long id);
}
