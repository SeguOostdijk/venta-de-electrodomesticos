package com.homeappliance_commerce.product.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Schema(name = "ErrorResponse", description = "Estructura estandar para respuestas de error")
public class ErrorResponse {

    @Schema(description = "Fecha y hora en que ocurrio el error", example = "2026-03-09T10:15:30")
    private LocalDateTime timestamp;

    @Schema(description = "Codigo HTTP del error", example = "404")
    private int status;

    @Schema(description = "Descripcion breve del tipo de error", example = "Not Found")
    private String error;

    @Schema(description = "Mensaje detallado del error", example = "No se encontro el producto con id 10")
    private String message;

    @Schema(description = "Ruta de la peticion que genero el error", example = "/products/10")
    private String path;
}
