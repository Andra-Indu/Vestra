//package com.excelR.vestra_backend.repository;
//
//import com.excelR.vestra_backend.model.CartItem;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface CartRepository extends JpaRepository<CartItem, Long> {
//    List<CartItem> findByUserEmail(String userEmail);
//}



//=====

package com.excelR.vestra_backend.repository;

import com.excelR.vestra_backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserEmail(String userEmail);

    boolean existsByUserEmailAndProductId(String userEmail, String productId);

    @Transactional
    @Modifying
    void deleteByUserEmailAndProductId(String userEmail, String productId);
}
