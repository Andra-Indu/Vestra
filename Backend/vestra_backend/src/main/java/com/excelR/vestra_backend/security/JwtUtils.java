package com.excelR.vestra_backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtils {

    // ✅ Use a valid Base64 key (64 chars)
    private static final String SECRET_KEY = "N1rZc3E2VnZQZXZkWmtUZEN3R2lWdnQ5ak9rM2t2bUF4d0hZL2V4U0E1ZVpoY3ZTTnF1Q2hQWkE9PQ==";
    private static final long EXPIRATION_TIME = 86400000; // 1 day

    private SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
