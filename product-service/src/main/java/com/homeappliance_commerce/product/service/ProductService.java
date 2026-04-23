package com.homeappliance_commerce.product.service;

import com.homeappliance_commerce.product.exception.InsufficientStockException;
import com.homeappliance_commerce.product.exception.ProductNotFoundException;
import com.homeappliance_commerce.product.model.Product;
import com.homeappliance_commerce.product.repository.IProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {

    private final IProductRepository productRepository;

    public ProductService(IProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public List<Product> findAllById(List<Long> ids) {
        return productRepository.findAllById(ids);
    }

    @Override
    public Product save(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("El producto no puede ser nulo");
        }
        Product newProduct = new Product();
        newProduct.setName(product.getName());
        newProduct.setBrand(product.getBrand());
        newProduct.setPrice(product.getPrice());
        newProduct.setStock(product.getStock());
        newProduct.setDescription(product.getDescription());
        newProduct.setImageUrl(product.getImageUrl());
        return productRepository.save(newProduct);
    }

    @Override
    public Product edit(Long id, Product product) {
        Product selectedProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        selectedProduct.setName(product.getName());
        selectedProduct.setBrand(product.getBrand());
        selectedProduct.setPrice(product.getPrice());
        selectedProduct.setStock(product.getStock());
        selectedProduct.setDescription(product.getDescription());
        selectedProduct.setImageUrl(product.getImageUrl());
        return productRepository.save(selectedProduct);
    }

    @Override
    public Product deleteById(Long id) {
        Product selectedProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        productRepository.delete(selectedProduct);
        return selectedProduct;
    }

    @Override
    public Page<Product> search(String q, Pageable pageable) {
        return productRepository.searchByNameOrBrand(q, pageable);
    }

    @Override
    public void decrementStock(Long id, int quantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        if (product.getStock() < quantity) {
            throw new InsufficientStockException(id, product.getStock(), quantity);
        }
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }
}
