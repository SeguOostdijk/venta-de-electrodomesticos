package com.homeappliance_commerce.sale_service.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public  class SaleProduct {
    private Long productId;
    private String name;
    private String brand;
    private Float price;
    private Integer quantity;
}