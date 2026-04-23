package com.homeappliance_commerce.ai_service.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SaleProductDTO {
    private Long productId;
    private String name;
    private String brand;
    private BigDecimal price;
    private int quantity;
}
