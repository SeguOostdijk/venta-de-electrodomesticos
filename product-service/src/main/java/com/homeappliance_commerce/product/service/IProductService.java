package com.homeappliance_commerce.product.service;

import com.homeappliance_commerce.product.model.Product;

import java.util.List;

public interface IProductService {
    public Product findById(Long id);
    public List<Product> findAllById(List<Long> ids);
    public Product save(Product product);
    public Product edit(Long id,Product product);
    public Product deleteById(Long id);
}
