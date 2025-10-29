package com.excelR.vestra_backend.controller;


import com.excelR.vestra_backend.entity.User;
import com.excelR.vestra_backend.repository.*;
import com.excelR.vestra_backend.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "${app.frontend.url}")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired UserRepository userRepository;
    @Autowired BCryptPasswordEncoder encoder;
    @Autowired JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        if (userRepository.existsByEmail(body.get("email"))) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already in use"));
        }
        User u = new User();
        u.setName(body.get("name"));
        u.setEmail(body.get("email"));
        u.setPassword(encoder.encode(body.get("password")));
        userRepository.save(u);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        var opt = userRepository.findByEmail(body.get("email"));
        if (opt.isEmpty() || !encoder.matches(body.get("password"), opt.get().getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }
        User u = opt.get();
        String token = jwtUtils.generateJwtToken(u.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "name", u.getName(), "email", u.getEmail()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String auth) {
        String token = auth.substring(7);
        if (!jwtUtils.validateJwtToken(token))
            return ResponseEntity.status(401).body(Map.of("message", "Invalid token"));
        String email = jwtUtils.getEmailFromToken(token);
        var user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        return ResponseEntity.ok(Map.of("name", user.getName(), "email", user.getEmail()));
    }
}
