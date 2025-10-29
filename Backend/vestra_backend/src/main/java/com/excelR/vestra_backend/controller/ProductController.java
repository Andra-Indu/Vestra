package com.excelR.vestra_backend.controller;

import com.excelR.vestra_backend.entity.Product;
import com.excelR.vestra_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // ✅ Allow requests from React frontend
public class ProductController {

    @Autowired
    private ProductService productService;

    // ===============================
    // 🟢 ADD NEW PRODUCT (POST)
    // ===============================
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.addProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    // ===============================
    // 🟡 GET ALL PRODUCTS (GET)
    // ===============================
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // ===============================
    // 🔵 GET PRODUCT BY ID (GET)
    // ===============================
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ===============================
    // 🟣 GET PRODUCTS BY CATEGORY (GET)
    // ===============================
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    // ===============================
    // 🟠 UPDATE PRODUCT (PUT)
    // ===============================
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product product = productService.updateProduct(id, updatedProduct);
        return ResponseEntity.ok(product);
    }

    // ===============================
    // 🔴 DELETE PRODUCT (DELETE)
    // ===============================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        if (deleted) {
            return ResponseEntity.ok("✅ Product deleted successfully with ID: " + id);
        } else {
            return ResponseEntity.status(404).body("❌ Product not found with ID: " + id);
        }
    }
}
