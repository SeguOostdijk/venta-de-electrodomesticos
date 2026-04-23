package com.homeappliance_commerce.sale_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "product-service")
public interface IProductApi {
    @PutMapping("/products/{id}/stock")
    void decrementStock(@PathVariable("id") Long id, @RequestParam("quantity") int quantity);
}
