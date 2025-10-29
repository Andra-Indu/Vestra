package com.excelR.vestra_backend.model;

//src/main/java/com/vestra/model/CartItem.java


import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nullable = false)
private String userEmail;

@Column(nullable = false)
private String productId;

private String name;
private String image;
private Double price;
private Integer quantity;

public CartItem() {}

public CartItem(String userEmail, String productId, String name, String image, Double price, Integer quantity) {
 this.userEmail = userEmail;
 this.productId = productId;
 this.name = name;
 this.image = image;
 this.price = price;
 this.quantity = quantity;
}

// Getters and setters
public Long getId() { return id; }
public void setId(Long id) { this.id = id; }
public String getUserEmail() { return userEmail; }
public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
public String getProductId() { return productId; }
public void setProductId(String productId) { this.productId = productId; }
public String getName() { return name; }
public void setName(String name) { this.name = name; }
public String getImage() { return image; }
public void setImage(String image) { this.image = image; }
public Double getPrice() { return price; }
public void setPrice(Double price) { this.price = price; }
public Integer getQuantity() { return quantity; }
public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
