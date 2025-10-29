package com.excelR.vestra_backend.repository;

//src/main/java/com/vestra/repository/WishlistRepository.java


import com.excelR.vestra_backend.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
List<WishlistItem> findByUserEmail(String userEmail);
boolean existsByUserEmailAndProductId(String userEmail, String productId);
}
