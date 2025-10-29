package com.excelR.vestra_backend.service;

import com.excelR.vestra_backend.model.CartItem;
import java.util.List;

public interface CartService {
    List<CartItem> getForUser(String email);
    CartItem add(String email, CartItem item);
    CartItem updateQuantity(Long id, String email, int quantity);
    boolean remove(Long id, String email);
}
