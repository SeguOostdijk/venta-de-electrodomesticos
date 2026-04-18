package com.homeappliance_commerce.sale_service.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
@Schema(name = "Sale", description = "Representa una venta realizada en el sistema")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador unico de la venta", example = "10")
    private Long id;

    @Schema(description = "ID del usuario que realizó la venta", example = "7")
    private Long userId;

    @Schema(description = "Fecha en la que se registro la venta", example = "2026-03-09")
    private LocalDate date;

    @Schema(description = "Monto total de la venta", example = "1499.99")
    private BigDecimal totalPrice;

    @ElementCollection
    @CollectionTable(name = "sale_products", joinColumns = @JoinColumn(name = "sale_id"))
    @Schema(description = "Productos incluidos en la venta")
    private List<SaleProduct> products;

}
