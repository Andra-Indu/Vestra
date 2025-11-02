package com.excelR.vestra_backend.repository;

import com.excelR.vestra_backend.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {

    List<WishlistItem> findByUserEmail(String userEmail);

    boolean existsByUserEmailAndProductId(String userEmail, String productId);

    @Transactional
    @Modifying
    @Query("DELETE FROM WishlistItem w WHERE w.userEmail = :userEmail AND w.productId = :productId")
    void deleteByUserEmailAndProductId(String userEmail, String productId);
}
