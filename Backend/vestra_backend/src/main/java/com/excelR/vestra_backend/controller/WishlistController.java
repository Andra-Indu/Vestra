package com.excelR.vestra_backend.controller;

//src/main/java/com/vestra/controller/WishlistController.java


import com.excelR.vestra_backend.model.*;
import com.excelR.vestra_backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173") // adjust to your frontend origin
public class WishlistController {
private final WishlistService service;

public WishlistController(WishlistService service) { this.service = service; }

// Get wishlist for authenticated user
@GetMapping
public ResponseEntity<List<WishlistItem>> getWishlist(Principal principal) {
 // Principal should be populated by Spring Security from JWT.
 // If you're not using security, you can pass userEmail as query param.
 String userEmail = principal != null ? principal.getName() : "anonymous@example.com";
 List<WishlistItem> items = service.getForUser(userEmail);
 return ResponseEntity.ok(items);
}

// Add item
@PostMapping
public ResponseEntity<?> addToWishlist(@RequestBody WishlistItem item, Principal principal) {
 String userEmail = principal != null ? principal.getName() : item.getUserEmail();
 if (userEmail == null) return ResponseEntity.badRequest().body("User not identified");
 WishlistItem saved = service.add(userEmail, item);
 if (saved == null) return ResponseEntity.status(409).body("Already in wishlist");
 return ResponseEntity.ok(saved);
}

// Remove item by id
@DeleteMapping("/{id}")
public ResponseEntity<?> remove(@PathVariable Long id, Principal principal) {
 String userEmail = principal != null ? principal.getName() : null;
 if (userEmail == null) return ResponseEntity.status(403).body("Not authorized");
 boolean removed = service.remove(id, userEmail);
 if (removed) return ResponseEntity.ok().build();
 return ResponseEntity.status(404).body("Not found or not yours");
}
}

