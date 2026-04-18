package com.homeappliance_commerce.sale_service.service;

import com.homeappliance_commerce.sale_service.model.Sale;

import java.util.List;

public interface ISaleService {

    Sale createSale(Long cartId, Long userId);
    List<Sale> getAllSales();
    Sale getSaleById(Long id);
    List<Sale> getSalesByDate(String date);
    void deleteSale(Long id);
}
