package com.excelR.vestra_backend.service;

//src/main/java/com/vestra/service/WishlistService.java


import com.excelR.vestra_backend.model.WishlistItem;
import com.excelR.vestra_backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
private final WishlistRepository repo;

public WishlistService(WishlistRepository repo) {
 this.repo = repo;
}

public List<WishlistItem> getForUser(String userEmail) {
 return repo.findByUserEmail(userEmail);
}

public WishlistItem add(String userEmail, WishlistItem item) {
 // avoid duplicates
 if (repo.existsByUserEmailAndProductId(userEmail, item.getProductId())) {
   return null; // or throw
 }
 item.setUserEmail(userEmail);
 return repo.save(item);
}

public boolean remove(Long id, String userEmail) {
 Optional<WishlistItem> w = repo.findById(id);
 if (w.isPresent() && w.get().getUserEmail().equals(userEmail)) {
   repo.deleteById(id);
   return true;
 }
 return false;
}
}
