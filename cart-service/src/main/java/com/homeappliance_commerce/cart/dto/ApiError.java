package com.homeappliance_commerce.cart.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Respuesta estandar de error de la API")
public class ApiError {

    @Schema(description = "Fecha y hora de la respuesta en formato ISO-8601", example = "2026-03-09T16:40:10")
    private String timestamp;

    @Schema(description = "Codigo de estado HTTP", example = "404")
    private int status;

    @Schema(description = "Descripcion corta del error HTTP", example = "Not Found")
    private String error;

    @Schema(description = "Detalle del error", example = "Cart not found with id: 99")
    private String message;
}
