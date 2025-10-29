package com.excelR.vestra_backend.repository;

//src/main/java/com/vestra_backend/repository/ProductRepository.java


import com.excelR.vestra_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}
