package com.agro.service;

import com.agro.entity.User;
import com.agro.repository.UserRepository;
import com.agro.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<String> register(User user) {
        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        if (user.getUsername() == null || user.getPassword() == null || user.getRole() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required fields");
        }

        userRepo.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    public ResponseEntity<?> login(User user) {
        try {
            if (user.getUsername() == null || user.getPassword() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or password missing");
            }

            User existing = userRepo.findByUsername(user.getUsername()).orElse(null);

            if (existing == null || !existing.getPassword().equals(user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            String token = jwtUtil.generateToken(existing.getUsername(), existing.getRole());

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "role", existing.getRole()
            ));
        } catch (Exception e) {
            e.printStackTrace(); // Show error in terminal
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong: " + e.getMessage());
        }
    }
}
