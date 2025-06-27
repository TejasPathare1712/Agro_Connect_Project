package com.agro.service;


import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.agro.entity.Product;
import com.agro.repository.ProductRepository;
import com.agro.repository.UserRepository;
import com.agro.util.JwtUtil;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<String> addProduct(String token, Product product) {
        String username = jwtUtil.extractUsername(token);
        com.agro.entity.User farmer = userRepo.findByUsername(username).orElse(null);
        if (!farmer.getRole().equals("FARMER")) return ResponseEntity.status(403).body("Access denied");
        product.setFarmer(farmer);
        productRepo.save(product);
        return ResponseEntity.ok("Product added successfully");
    }

    public ResponseEntity<List<Product>> getAll() {
        return ResponseEntity.ok(productRepo.findAll());
    }

    public ResponseEntity<List<Product>> getFarmerProducts(String token) {
        String username = jwtUtil.extractUsername(token);
        com.agro.entity.User farmer = userRepo.findByUsername(username).orElse(null);
        return ResponseEntity.ok(productRepo.findByFarmer(farmer));
    }
}
