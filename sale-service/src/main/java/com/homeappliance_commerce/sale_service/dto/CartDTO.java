package com.homeappliance_commerce.sale_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CartDTO {
    private Long id;
    private Float totalPrice;
    private List<ProductCart> products;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public static class ProductCart {
        private Long productId;
        private String name;
        private String brand;
        private Float price;
        private Integer quantity;
    }
}
