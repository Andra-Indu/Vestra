package com.excelR.vestra_backend.service;

import com.excelR.vestra_backend.model.CartItem;
import com.excelR.vestra_backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository repo;

    @Override
    public List<CartItem> getForUser(String email) {
        return repo.findByUserEmail(email);
    }

    @Override
    public CartItem add(String email, CartItem item) {
        item.setUserEmail(email);
        return repo.save(item);
    }

    @Override
    public CartItem updateQuantity(Long id, String email, int quantity) {
        CartItem existing = repo.findById(id)
                .filter(c -> c.getUserEmail().equals(email))
                .orElseThrow(() -> new RuntimeException("Item not found or not authorized"));
        existing.setQuantity(quantity);
        return repo.save(existing);
    }

    @Override
    public boolean remove(Long id, String email) {
        return repo.findById(id)
                .filter(c -> c.getUserEmail().equals(email))
                .map(item -> {
                    repo.delete(item);
                    return true;
                })
                .orElse(false);
    }
}
