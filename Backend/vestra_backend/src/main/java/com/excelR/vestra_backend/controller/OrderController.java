package com.excelR.vestra_backend.controller;

import com.excelR.vestra_backend.model.Order;
import com.excelR.vestra_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*") // ✅ Allow frontend requests
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // ✅ Save new order (from frontend PaymentPage.jsx)
    @PostMapping("/save")
    public ResponseEntity<Order> saveOrder(@RequestBody Order order) {
        try {
            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ✅ Fetch all orders (for Admin Dashboard)
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderRepository.findAll();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ✅ Fetch all orders by specific user email (for User Dashboard)
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable String email) {
        try {
            List<Order> userOrders = orderRepository.findAll()
                    .stream()
                    .filter(order -> email.equalsIgnoreCase(order.getUserEmail()))
                    .toList();
            return ResponseEntity.ok(userOrders);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
