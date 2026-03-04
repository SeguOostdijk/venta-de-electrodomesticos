package com.homeappliance_commerce.sale_service.controller;

import com.homeappliance_commerce.sale_service.model.Sale;
import com.homeappliance_commerce.sale_service.service.ISaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
public class SaleController {

    @Autowired
    private ISaleService saleService;

    // Crear una nueva venta asociada a un carrito
    @PostMapping("/{cartId}")
    public ResponseEntity<Sale> createSale(@PathVariable Long cartId) {
        Sale newSale = saleService.createSale(cartId);
        return new ResponseEntity<>(newSale, HttpStatus.CREATED);
    }

    // Obtener todas las ventas
    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {
        List<Sale> sales = saleService.getAllSales();
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }

    // Obtener una venta por ID
    @GetMapping("/{id}")
    public ResponseEntity<Sale> getSaleById(@PathVariable Long id) {
        Sale sale = saleService.getSaleById(id);
        return new ResponseEntity<>(sale, HttpStatus.OK);
    }


    // Obtener ventas por fecha (formato: YYYY-MM-DD)
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Sale>> getSalesByDate(@PathVariable String date) {
        List<Sale> sales = saleService.getSalesByDate(date);
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }

    // Eliminar una venta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {
        saleService.deleteSale(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
