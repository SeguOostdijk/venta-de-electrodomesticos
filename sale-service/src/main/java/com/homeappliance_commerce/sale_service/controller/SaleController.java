package com.homeappliance_commerce.sale_service.controller;

import com.homeappliance_commerce.sale_service.exception.ErrorResponse;
import com.homeappliance_commerce.sale_service.model.Sale;
import com.homeappliance_commerce.sale_service.service.ISaleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
@Tag(name = "Sales", description = "Operaciones para gestionar ventas")
public class SaleController {

    @Autowired
    private ISaleService saleService;

    @PostMapping("/{cartId}")
    @Operation(summary = "Crear venta desde carrito", description = "Genera una venta a partir del identificador de un carrito")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Venta creada correctamente",
                    content = @Content(schema = @Schema(implementation = Sale.class))),
            @ApiResponse(responseCode = "404", description = "Carrito no encontrado",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Servicio de carrito no disponible",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Sale> createSale(
            @Parameter(description = "ID del carrito", example = "12")
            @PathVariable Long cartId) {
        Sale newSale = saleService.createSale(cartId);
        return new ResponseEntity<>(newSale, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Listar ventas", description = "Obtiene todas las ventas registradas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Sale.class))))
    })
    public ResponseEntity<List<Sale>> getAllSales() {
        List<Sale> sales = saleService.getAllSales();
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar venta por ID", description = "Obtiene una venta especifica por su identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Venta encontrada",
                    content = @Content(schema = @Schema(implementation = Sale.class))),
            @ApiResponse(responseCode = "404", description = "Venta no encontrada",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Sale> getSaleById(
            @Parameter(description = "ID de la venta", example = "5")
            @PathVariable Long id) {
        Sale sale = saleService.getSaleById(id);
        return new ResponseEntity<>(sale, HttpStatus.OK);
    }

    @GetMapping("/date/{date}")
    @Operation(summary = "Listar ventas por fecha", description = "Obtiene ventas filtradas por fecha en formato ISO (yyyy-MM-dd)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ventas encontradas",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Sale.class)))),
            @ApiResponse(responseCode = "400", description = "Fecha invalida",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<List<Sale>> getSalesByDate(
            @Parameter(description = "Fecha de consulta en formato yyyy-MM-dd", example = "2026-03-09")
            @PathVariable String date) {
        List<Sale> sales = saleService.getSalesByDate(date);
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar venta", description = "Elimina una venta por su identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Venta eliminada correctamente"),
            @ApiResponse(responseCode = "404", description = "Venta no encontrada",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Void> deleteSale(
            @Parameter(description = "ID de la venta", example = "5")
            @PathVariable Long id) {
        saleService.deleteSale(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
