package com.excelR.vestra_backend.controller;

import com.excelR.vestra_backend.model.User;
import com.excelR.vestra_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all users (for Admin Panel)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // ✅ Promote user to ADMIN
    @PutMapping("/{id}/make-admin")
    public ResponseEntity<String> makeUserAdmin(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setRole("ADMIN");
                    userRepository.save(user);
                    return ResponseEntity.ok("User promoted to ADMIN successfully!");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ (Optional) Create or update user — useful if you want manual testing in Postman
    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }
}
