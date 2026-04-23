package com.homeappliance_commerce.ai_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "product-service")
public interface IProductApi {
    @GetMapping("/products")
    Map<String, Object> findAll(@RequestParam int page, @RequestParam int size);
}
