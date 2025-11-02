
package com.excelR.vestra_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;
    private String productId;
    private String name;
    private String category;
    private String image;
    private Double price;
    private int quantity;

    public CartItem() {}

    public CartItem(String userEmail, String productId, String name, String category, String image, Double price, int quantity) {
        this.userEmail = userEmail;
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }

    public Long getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public String getProductId() { return productId; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getImage() { return image; }
    public Double getPrice() { return price; }
    public int getQuantity() { return quantity; }

    public void setId(Long id) { this.id = id; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public void setProductId(String productId) { this.productId = productId; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setImage(String image) { this.image = image; }
    public void setPrice(Double price) { this.price = price; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
