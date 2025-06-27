package com.agro.service;

import com.agro.entity.CartItem;
import com.agro.entity.Order;
import com.agro.entity.OrderItem;
import com.agro.entity.User;
import com.agro.repository.CartItemRepository;
import com.agro.repository.OrderItemRepository;
import com.agro.repository.OrderRepository;
import com.agro.repository.UserRepository;
import com.agro.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartItemRepository cartRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<String> placeOrder(String token) {
        String username = jwtUtil.extractUsername(token);
        User customer = userRepo.findByUsername(username).orElse(null);
        if (customer == null) return ResponseEntity.badRequest().body("Invalid user");

        List<CartItem> cartItems = cartRepo.findByCustomer(customer);
        if (cartItems.isEmpty()) return ResponseEntity.badRequest().body("Cart is empty");

        // ✅ Create and save order
        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderDate(new Date()); // ✅ Fixed: use java.util.Date
        orderRepo.save(order);

        // ✅ Create and save order items
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItems.add(orderItem);
        }
        orderItemRepo.saveAll(orderItems);

        // ✅ Clear the cart
        cartRepo.deleteAll(cartItems);

        return ResponseEntity.ok("Order placed successfully");
    }

    public ResponseEntity<List<Order>> viewOrders(String token) {
        String username = jwtUtil.extractUsername(token);
        User customer = userRepo.findByUsername(username).orElse(null);
        if (customer == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(orderRepo.findByCustomer(customer));
    }
}
