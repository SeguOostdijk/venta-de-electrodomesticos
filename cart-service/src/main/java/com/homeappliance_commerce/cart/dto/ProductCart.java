package com.homeappliance_commerce.cart.dto;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Embeddable
public class ProductCart {
    private Long id;
    private String name;
    private String brand;
    private Float price;
    private int quantity;

}
