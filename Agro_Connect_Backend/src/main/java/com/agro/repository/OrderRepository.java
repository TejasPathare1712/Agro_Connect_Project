package com.agro.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.agro.entity.Order;
import com.agro.entity.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomer(User customer);
}

