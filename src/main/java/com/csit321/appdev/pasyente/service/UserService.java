package com.csit321.appdev.pasyente.service;

import org.springframework.stereotype.Service;

import com.csit321.appdev.pasyente.entity.User;
import com.csit321.appdev.pasyente.repository.UserRepository;

// UserService.java
@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // Register user with email
    public User register(String name, String email, String password) {
        // Check if username or email already exists
        if (userRepo.findByName(name) != null || userRepo.findByEmail(email) != null) {
            return null; // user exists
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);    // save email
        user.setPassword(password);
        return userRepo.save(user);
    }

    // Login by email
    public User loginByEmail(String email, String password) {
        User user = userRepo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
