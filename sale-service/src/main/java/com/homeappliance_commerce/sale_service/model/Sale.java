package com.homeappliance_commerce.sale_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private Float totalPrice;

    @ElementCollection
    @CollectionTable(name = "sale_products", joinColumns = @JoinColumn(name = "sale_id"))
    private List<SaleProduct> products;

}
