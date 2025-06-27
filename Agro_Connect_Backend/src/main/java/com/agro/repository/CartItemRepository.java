package com.agro.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.agro.entity.CartItem;
import com.agro.entity.User;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCustomer(User customer);
    void deleteByCustomer(User customer);
}

// OrderRepository.java
