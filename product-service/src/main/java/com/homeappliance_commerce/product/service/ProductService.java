package com.homeappliance_commerce.product.service;

import com.homeappliance_commerce.product.exception.ProductNotFoundException;
import com.homeappliance_commerce.product.model.Product;
import com.homeappliance_commerce.product.repository.IProductRepository;
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
    public List<Product> findAllById(List<Long> ids) {
        return productRepository.findAllById(ids);
    }

    @Override
    public Product save(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("El producto no puede ser nulo");
        }
        Product newProduct = new Product();
        newProduct.setBrand(product.getBrand());
        newProduct.setName(product.getName());
        newProduct.setPrice(product.getPrice());
        return productRepository.save(newProduct);
    }

    @Override
    public Product edit(Long id, Product product) {
        Product selectedProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        selectedProduct.setPrice(product.getPrice());
        selectedProduct.setBrand(product.getBrand());
        selectedProduct.setName(product.getName());

        return productRepository.save(selectedProduct);
    }

    @Override
    public Product deleteById(Long id) {
        Product selectedProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        productRepository.delete(selectedProduct);
        return selectedProduct;
    }
}
