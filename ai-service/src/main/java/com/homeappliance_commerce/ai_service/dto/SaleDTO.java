package com.homeappliance_commerce.ai_service.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class SaleDTO {
    private Long id;
    private Long userId;
    private String date;
    private BigDecimal totalPrice;
    private List<SaleProductDTO> products;
}
