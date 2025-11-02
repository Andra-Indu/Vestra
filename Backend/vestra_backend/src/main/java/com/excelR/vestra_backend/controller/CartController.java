//package com.excelR.vestra_backend.controller;
//
//import com.excelR.vestra_backend.model.CartItem;
//import com.excelR.vestra_backend.service.CartService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.security.Principal;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/cart")
//@CrossOrigin(origins = "http://localhost:5173")
//public class CartController {
//
//    private final CartService service;
//
//    public CartController(CartService service) {
//        this.service = service;
//    }
//
//    // ==========================================
//    // 🟢 GET CART ITEMS
//    // GET http://localhost:8080/api/cart
//    // ==========================================
//    @GetMapping
//    public ResponseEntity<List<CartItem>> getCart(Principal principal) {
//        // Fallback if no authentication
//        String email = principal != null ? principal.getName() : "guest@vestra.com";
//        return ResponseEntity.ok(service.getForUser(email));
//    }
//
//    // ==========================================
//    // 🟡 ADD ITEM TO CART
//    // POST http://localhost:8080/api/cart
//    // Body (JSON):
//    // {
//    //   "name": "T-Shirt",
//    //   "price": 899,
//    //   "quantity": 1,
//    //   "image": "https://example.com/tshirt.jpg"
//    // }
//    // ==========================================
//    @PostMapping
//    public ResponseEntity<CartItem> addItem(@RequestBody CartItem item, Principal principal) {
//        String email = principal != null ? principal.getName() : item.getUserEmail();
//        return ResponseEntity.ok(service.add(email, item));
//    }
//
//    // ==========================================
//    // 🟠 UPDATE QUANTITY
//    // PUT http://localhost:8080/api/cart/{id}
//    // Body: { "quantity": 2 }
//    // ==========================================
//    @PutMapping("/{id}")
//    public ResponseEntity<CartItem> updateQty(
//            @PathVariable Long id,
//            @RequestBody CartItem body,
//            Principal principal
//    ) {
//        String email = principal != null ? principal.getName() : body.getUserEmail();
//        return ResponseEntity.ok(service.updateQuantity(id, email, body.getQuantity()));
//    }
//
//    // ==========================================
//    // 🔴 DELETE ITEM
//    // DELETE http://localhost:8080/api/cart/{id}
//    // ==========================================
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> removeItem(@PathVariable Long id, Principal principal) {
//        String email = principal != null ? principal.getName() : "guest@vestra.com";
//        boolean removed = service.remove(id, email);
//        return removed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
//    }
//}




//=============
//package com.excelR.vestra_backend.controller;
//
//import com.excelR.vestra_backend.model.CartItem;
//import com.excelR.vestra_backend.service.CartService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin(origins = "*") // ✅ Allow frontend access
//@RestController
//public class CartController {
//
//    private final CartService cartService;
//
//    public CartController(CartService cartService) {
//        this.cartService = cartService;
//    }
//
//    // ✅ Add item to cart
//    @PostMapping("/api/cart/add")
//    public CartItem addToCart(@RequestBody CartItem item) {
//        return cartService.addToCart(item);
//    }
//
//    // ✅ Get user's cart
//    @GetMapping("/cart/{email}")
//    public List<CartItem> getUserCart(@PathVariable String email) {
//        return cartService.getUserCart(email);
//    }
//
//    // ✅ Remove item from cart
//    @DeleteMapping("/api/cart/remove/{email}/{productId}")
//    public void removeFromCart(@PathVariable String email, @PathVariable String productId) {
//        cartService.removeFromCart(email, productId);
//    }
//
//    // ✅ Clear entire cart (optional)
//    @DeleteMapping("/api/cart/clear/{email}")
//    public void clearCart(@PathVariable String email) {
//        cartService.clearCart(email);
//    }
//}


//package com.excelR.vestra_backend.controller;
//
//import com.excelR.vestra_backend.model.CartItem;
//import com.excelR.vestra_backend.service.CartService;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost:5173")
//@RestController
//@RequestMapping("/api/cart") // ✅ Base path added
//public class CartController {
//
//    private final CartService cartService;
//
//    public CartController(CartService cartService) {
//        this.cartService = cartService;
//    }
//
//    // ✅ Add item
//    @PostMapping("/add")
//    public CartItem addToCart(@RequestBody CartItem item) {
//        return cartService.addToCart(item);
//    }
//
//    // ✅ Get all items by user
//    @GetMapping("/{email}")
//    public List<CartItem> getUserCart(@PathVariable String email) {
//        return cartService.getUserCart(email);
//    }
//
//    // ✅ Remove single item
//    @DeleteMapping("/remove/{email}/{productId}")
//    public void removeFromCart(@PathVariable String email, @PathVariable String productId) {
//        cartService.removeFromCart(email, productId);
//    }
//
//    // ✅ Clear full cart (optional)
//    @DeleteMapping("/clear/{email}")
//    public void clearCart(@PathVariable String email) {
//        cartService.clearCart(email);
//    }
//}


package com.excelR.vestra_backend.controller;

import com.excelR.vestra_backend.model.CartItem;
import com.excelR.vestra_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // ✅ Add item to cart
    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartItem item) {
        return cartService.addToCart(item);
    }

    // ✅ Get all cart items for a user
    @GetMapping("/{userEmail}")
    public List<CartItem> getCart(@PathVariable String userEmail) {
        return cartService.getCartByUser(userEmail);
    }

    // ✅ Remove single item from cart
    @DeleteMapping("/remove/{userEmail}/{productId}")
    public void removeFromCart(@PathVariable String userEmail, @PathVariable String productId) {
        cartService.removeFromCart(userEmail, productId);
    }

    // ✅ Clear all items in user's cart
    @DeleteMapping("/clear/{userEmail}")
    public void clearCart(@PathVariable String userEmail) {
        cartService.clearCart(userEmail);
    }
}

