package com.agro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.agro.entity.CartItem;
import com.agro.entity.Product;
import com.agro.entity.User;
import com.agro.repository.CartItemRepository;
import com.agro.repository.ProductRepository;
import com.agro.repository.UserRepository;
import com.agro.util.JwtUtil;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartItemRepository cartRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<String> addToCart(String token, Long productId, int quantity) {
        String username = jwtUtil.extractUsername(token);
        User customer = userRepo.findByUsername(username).orElse(null);
        if (customer == null) return ResponseEntity.badRequest().body("Invalid user");

        Product product = productRepo.findById(productId).orElse(null);
        if (product == null) return ResponseEntity.badRequest().body("Product not found");

        CartItem item = new CartItem();
        item.setCustomer(customer);
        item.setProduct(product);
        item.setQuantity(quantity);
        cartRepo.save(item);

        return ResponseEntity.ok("Item added to cart");
    }

    public ResponseEntity<List<CartItem>> viewCart(String token) {
        String username = jwtUtil.extractUsername(token);
        User customer = userRepo.findByUsername(username).orElse(null);
        if (customer == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(cartRepo.findByCustomer(customer));
    }

    public ResponseEntity<String> removeFromCart(String token, Long itemId) {
        String username = jwtUtil.extractUsername(token);
        User customer = userRepo.findByUsername(username).orElse(null);
        CartItem item = cartRepo.findById(itemId).orElse(null);

        if (customer == null || item == null || !item.getCustomer().equals(customer)) {
            return ResponseEntity.badRequest().body("Unauthorized or item not found");
        }

        cartRepo.delete(item);
        return ResponseEntity.ok("Item removed from cart");
    }
}