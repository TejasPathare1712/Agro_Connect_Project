package com.agro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.agro.entity.CartItem;
import com.agro.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestParam Long productId,
                                            @RequestParam int quantity,
                                            @RequestHeader("Authorization") String token) {
        return cartService.addToCart(token.replace("Bearer ", ""), productId, quantity);
    }

    @GetMapping("/view")
    public ResponseEntity<List<CartItem>> viewCart(@RequestHeader("Authorization") String token) {
        return cartService.viewCart(token.replace("Bearer ", ""));
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeItem(@PathVariable Long id,
                                             @RequestHeader("Authorization") String token) {
        return cartService.removeFromCart(token.replace("Bearer ", ""), id);
    }
}