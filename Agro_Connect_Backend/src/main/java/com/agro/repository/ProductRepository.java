// ProductRepository.java
package com.agro.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.agro.entity.Product;
import com.agro.entity.User;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFarmer(User farmer);
}