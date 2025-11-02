// package com.excelR.vestra_backend.controller;

// import com.excelR.vestra_backend.repository.*;
// import org.springframework.web.bind.annotation.*;
// import java.util.*;

// @RestController
// @RequestMapping("/api/admin")
// @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
// public class AdminStatsController {

//     private final ProductRepository productRepository;
//     private final OrderRepository orderRepository;
//     private final UserRepository userRepository;

//     public AdminStatsController(ProductRepository productRepository, OrderRepository orderRepository, UserRepository userRepository) {
//         this.productRepository = productRepository;
//         this.orderRepository = orderRepository;
//         this.userRepository = userRepository;
//     }

//     @GetMapping("/stats")
//     public Map<String, Object> getStats() {
//         Map<String, Object> stats = new HashMap<>();

//         stats.put("totalProducts", productRepository.count());
//         stats.put("totalOrders", orderRepository.count());
//         stats.put("totalUsers", userRepository.count());

//         // Safely calculate total revenue
//         double totalRevenue = orderRepository.findAll().stream()
//                 .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0)
//                 .sum();

//         stats.put("revenue", totalRevenue);
//         return stats;
//     }
// }
package com.excelR.vestra_backend.controller;

import com.excelR.vestra_backend.repository.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")  // ✅ Add this here
public class AdminStatsController {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public AdminStatsController(ProductRepository productRepository, OrderRepository orderRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalProducts", productRepository.count());
        stats.put("totalOrders", orderRepository.count());
        stats.put("totalUsers", userRepository.count());

        double totalRevenue = orderRepository.findAll().stream()
                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0)
                .sum();

        stats.put("revenue", totalRevenue);
        return stats;
    }
}
