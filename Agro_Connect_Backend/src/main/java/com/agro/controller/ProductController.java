package com.agro.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.agro.entity.Product;
import com.agro.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")

public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestBody Product product, @RequestHeader("Authorization") String token) {
        return productService.addProduct(token.substring(7), product);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAll() {
        return productService.getAll();
    }

    @GetMapping("/my")
    public ResponseEntity<List<Product>> getFarmerProducts(@RequestHeader("Authorization") String token) {
        return productService.getFarmerProducts(token.substring(7));
    }
}
