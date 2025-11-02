package com.excelR.vestra_backend.controller;

import com.excelR.vestra_backend.model.Order;

import com.excelR.vestra_backend.model.OrderItem;
import com.excelR.vestra_backend.repository.OrderRepository;
import com.excelR.vestra_backend.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173") // ✅ Change if frontend runs elsewhere
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderRepository orderRepository;

    // 🟩 Step 1: Create Razorpay order
    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        try {
            int amount = (int) data.get("amount");
            com.razorpay.Order order = razorpayService.createOrder(amount);
            return ResponseEntity.ok(Map.of("order", order.toJson()));
        } catch (RazorpayException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // 🟩 Step 2: Verify Razorpay payment
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, Object> payload) {
        try {
            String orderId = (String) payload.get("razorpay_order_id");
            String paymentId = (String) payload.get("razorpay_payment_id");
            String signature = (String) payload.get("razorpay_signature");
            String email = (String) payload.get("email");
            double amount = Double.parseDouble(payload.get("amount").toString());

            boolean verified = razorpayService.verifySignature(orderId, paymentId, signature);

            if (!verified) {
                return ResponseEntity.badRequest().body(Map.of("status", "failed", "message", "Invalid signature"));
            }
            // create and save order
            Order order = new Order();
            order.setRazorpayOrderId(orderId);
            order.setRazorpayPaymentId(paymentId);
            order.setRazorpaySignature(signature);
            order.setUserEmail(email);
            order.setAmount(amount);
            order.setPaymentMethod("Razorpay");
            order.setStatus("PAID");
            // 🟢 Attach Order Items (if provided)
            List<Map<String, Object>> itemsList = (List<Map<String, Object>>) payload.get("items");
            if (itemsList != null) {
                List<OrderItem> orderItems = new ArrayList<>();
                for (Map<String, Object> itemData : itemsList) {
                    OrderItem item = new OrderItem();
                    item.setProductId(Long.parseLong(itemData.get("productId").toString()));
                    item.setProductName((String) itemData.get("productName"));
                    item.setProductCategory((String) itemData.get("productCategory"));
                    item.setPrice(Double.parseDouble(itemData.get("price").toString()));
                    item.setQuantity(Integer.parseInt(itemData.get("quantity").toString()));
                    item.setProductImage((String) itemData.get("productImage"));
                    item.setOrder(order);
                    orderItems.add(item);
                }
                order.setItems(orderItems);
            }
            orderRepository.save(order);

            return ResponseEntity.ok(Map.of("status", "success", "message", "Payment verified"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Verification failed: " + e.getMessage()));
        }
    }

    // 🟩 Step 3: Save Cash on Delivery
    @PostMapping("/offline")
    public ResponseEntity<?> saveOfflineOrder(@RequestBody Map<String, Object> body) {
        try {
            String email = (String) body.get("email");
            double amount = Double.parseDouble(body.get("amount").toString());
            String method = (String) body.get("method");

            Order order = new Order();
            order.setUserEmail(email);
            order.setAmount(amount);
            order.setPaymentMethod(method);
            order.setStatus("PENDING");

            // 🟢 Attach items if provided
            List<Map<String, Object>> itemsList = (List<Map<String, Object>>) body.get("cart");
            if (itemsList != null) {
                List<OrderItem> orderItems = new ArrayList<>();
                for (Map<String, Object> itemData : itemsList) {
                    OrderItem item = new OrderItem();
                    item.setProductId(Long.parseLong(itemData.get("id").toString()));
                    item.setProductName((String) itemData.get("name"));
                    item.setProductCategory((String) itemData.get("category"));
                    item.setPrice(Double.parseDouble(itemData.get("price").toString()));
                    item.setQuantity(1);
                    item.setOrder(order);
                    orderItems.add(item);
                }
                order.setItems(orderItems);
            }
            orderRepository.save(order);

            return ResponseEntity.ok(Map.of("status", "success", "message", "Order placed successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Failed to save offline order: " + e.getMessage()));
        }
    }

    // 🟩 Optional: Fetch all orders for display in frontend
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    // 🟩 STEP 5: Fetch Orders by User Email (User Dashboard)
    @GetMapping("/orders/{email}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable String email) {
        return ResponseEntity.ok(orderRepository.findByUserEmail(email));
    }
}
