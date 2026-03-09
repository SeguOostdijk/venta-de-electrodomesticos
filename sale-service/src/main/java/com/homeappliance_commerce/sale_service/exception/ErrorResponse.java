package com.homeappliance_commerce.sale_service.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter @AllArgsConstructor
@Schema(name = "ErrorResponse", description = "Estructura estandar de respuesta de error")
public class ErrorResponse {
    @Schema(description = "Codigo HTTP de la respuesta", example = "404")
    private int status;

    @Schema(description = "Mensaje descriptivo del error", example = "Sale not found")
    private String message;

    @Schema(description = "Tipo o titulo del error", example = "Sale Not Found")
    private String error;

    @Schema(description = "Fecha y hora en la que ocurre el error", example = "2026-03-09T12:30:45")
    private LocalDateTime timestamp;

    @Schema(description = "Ruta que origino el error", example = "/sales/99")
    private String path;
}
