package com.homeappliance_commerce.product.service;

import com.homeappliance_commerce.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface IProductService {
    public Product findById(Long id);
    public Page<Product> findAll(Pageable pageable);
    public List<Product> findAllById(List<Long> ids);
    public Product save(Product product);
    public Product edit(Long id,Product product);
    public Product deleteById(Long id);
    public Page<Product> search(String q, Pageable pageable);
}
