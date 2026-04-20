package com.homeappliance_commerce.sale_service.service;

import com.homeappliance_commerce.sale_service.client.ICartApi;
import com.homeappliance_commerce.sale_service.dto.CartDTO;
import com.homeappliance_commerce.sale_service.exception.CartNotFoundException;
import com.homeappliance_commerce.sale_service.exception.SaleNotFoundException;
import com.homeappliance_commerce.sale_service.exception.ServiceUnavailableException;
import com.homeappliance_commerce.sale_service.model.Sale;
import com.homeappliance_commerce.sale_service.model.SaleProduct;
import com.homeappliance_commerce.sale_service.repository.ISaleRepository;
import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SaleService implements ISaleService {

    private final ISaleRepository saleRepository;
    private final ICartApi cartApi;

    @CircuitBreaker(name = "cart-service", fallbackMethod = "createSaleFallback")
    @Override
    public Sale createSale(Long cartId, Long userId) {
        // Obtener el carrito del microservicio de carrito
        CartDTO selectedCart = cartApi.getCartById(cartId);

        // Crear la nueva venta
        Sale newSale = new Sale();
        newSale.setUserId(userId);
        newSale.setDate(LocalDate.now());
        newSale.setTotalPrice(selectedCart.getTotalPrice());

        // Mapear ProductCart a SaleProduct
        List<SaleProduct> saleProducts = selectedCart.getProducts()
                .stream()
                .map(productCart -> new SaleProduct(
                        productCart.getProductId(),
                        productCart.getName(),
                        productCart.getBrand(),
                        productCart.getPrice(),
                        productCart.getQuantity()
                ))
                .collect(Collectors.toList());

        newSale.setProducts(saleProducts);

        // Guardar la venta y limpiar el carrito
        Sale savedSale = saleRepository.save(newSale);
        cartApi.clearCart(cartId);
        return savedSale;
    }

    public Sale createSaleFallback(Long cartId, Long userId, Throwable t) {
        if (t instanceof CartNotFoundException ex) throw ex;
        if (t instanceof FeignException.FeignClientException) {
            throw new CartNotFoundException("Cart with ID " + cartId + " not found");
        }
        throw new ServiceUnavailableException("Cart service is unavailable. Please try again later.");
    }

    @Override
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    @Override
    public Sale getSaleById(Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new SaleNotFoundException("Sale with ID " + id + " not found"));
    }

    @Override
    public List<Sale> getSalesByDate(String date) {
        try {
            LocalDate localDate = LocalDate.parse(date);
            List<Sale> sales = saleRepository.findByDate(localDate);
            if (sales.isEmpty()) {
                throw new SaleNotFoundException("No sales found for date: " + date);
            }
            return sales;
        } catch (Exception e) {
            if (e instanceof SaleNotFoundException) {
                throw (SaleNotFoundException) e;
            }
            throw new IllegalArgumentException("Invalid date format. Please use YYYY-MM-DD format");
        }
    }

    @Override
    public void deleteSale(Long id) {
        if (!saleRepository.existsById(id)) {
            throw new SaleNotFoundException("Sale with ID " + id + " not found");
        }
        saleRepository.deleteById(id);
    }

    @Override
    public List<Sale> getSalesByUserId(Long userId) {
        return saleRepository.findByUserId(userId);
    }
}
