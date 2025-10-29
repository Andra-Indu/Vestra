package com.excelR.vestra_backend.controller;

import com.excelR.vestra_backend.model.CartItem;
import com.excelR.vestra_backend.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    // ==========================================
    // 🟢 GET CART ITEMS
    // GET http://localhost:8080/api/cart
    // ==========================================
    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(Principal principal) {
        // Fallback if no authentication
        String email = principal != null ? principal.getName() : "guest@vestra.com";
        return ResponseEntity.ok(service.getForUser(email));
    }

    // ==========================================
    // 🟡 ADD ITEM TO CART
    // POST http://localhost:8080/api/cart
    // Body (JSON):
    // {
    //   "name": "T-Shirt",
    //   "price": 899,
    //   "quantity": 1,
    //   "image": "https://example.com/tshirt.jpg"
    // }
    // ==========================================
    @PostMapping
    public ResponseEntity<CartItem> addItem(@RequestBody CartItem item, Principal principal) {
        String email = principal != null ? principal.getName() : item.getUserEmail();
        return ResponseEntity.ok(service.add(email, item));
    }

    // ==========================================
    // 🟠 UPDATE QUANTITY
    // PUT http://localhost:8080/api/cart/{id}
    // Body: { "quantity": 2 }
    // ==========================================
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateQty(
            @PathVariable Long id,
            @RequestBody CartItem body,
            Principal principal
    ) {
        String email = principal != null ? principal.getName() : body.getUserEmail();
        return ResponseEntity.ok(service.updateQuantity(id, email, body.getQuantity()));
    }

    // ==========================================
    // 🔴 DELETE ITEM
    // DELETE http://localhost:8080/api/cart/{id}
    // ==========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeItem(@PathVariable Long id, Principal principal) {
        String email = principal != null ? principal.getName() : "guest@vestra.com";
        boolean removed = service.remove(id, email);
        return removed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
