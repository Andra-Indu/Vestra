package com.excelR.vestra_backend.controller;

import com.excelR.vestra_backend.model.Product;
import com.excelR.vestra_backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
// Allow your React app (frontend) to communicate with this API
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // ✅ Fetch all products
    @GetMapping
    public List<Product> getAll() {
        return service.findAll();
    }

    // ✅ Fetch single product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Create new product
    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        try {
            Product saved = service.save(product);
            return ResponseEntity.created(URI.create("/api/products/" + saved.getId())).body(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✅ Update existing product
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product updated) {
        return service.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            existing.setPrice(updated.getPrice());
            existing.setImageUrl(updated.getImageUrl());
            existing.setCategory(updated.getCategory());
            Product saved = service.save(existing);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete product by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
