package com.excelR.vestra_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic product details
    private Long productId;
    private String productName;
    private String productCategory;
    private double price;
    private int quantity;
    private String productImage;

    // Each OrderItem belongs to one Order
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    // Constructors
    public OrderItem() {}

    public OrderItem(Long productId, String productName, String productCategory, double price, int quantity, String productImage) {
        this.productId = productId;
        this.productName = productName;
        this.productCategory = productCategory;
        this.price = price;
        this.quantity = quantity;
        this.productImage = productImage;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductCategory() { return productCategory; }
    public void setProductCategory(String productCategory) { this.productCategory = productCategory; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getProductImage() { return productImage; }
    public void setProductImage(String productImage) { this.productImage = productImage; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
}
