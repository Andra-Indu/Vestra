package com.excelR.vestra_backend.service;

import com.excelR.vestra_backend.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product addProduct(Product product);

    List<Product> getAllProducts();

    Optional<Product> getProductById(Long id);

    List<Product> getProductsByCategory(String category);

    Product updateProduct(Long id, Product updatedProduct);

    boolean deleteProduct(Long id);

    Page<Product> getAllProductsPaged(int page, int size);
}
