package com.excelR.vestra_backend.entity;

//src/main/java/com/vestra_backend/entity/Product.java


import jakarta.persistence.*;

@Entity
public class Product {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String name;
 private String description;
 private double price;
 private String imageUrl;
 private String category;

 // getters and setters
}
