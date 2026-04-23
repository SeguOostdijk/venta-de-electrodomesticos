package com.homeappliance_commerce.ai_service.client;

import com.homeappliance_commerce.ai_service.dto.SaleDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "sale-service")
public interface ISaleApi {
    @GetMapping("/sales")
    List<SaleDTO> getAll();
}
