package com.homeappliance_commerce.sale_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ProductCart {
    private  Long id;
    private String name;
    private String brand;
    private Float price;
    private int quantity;
}
