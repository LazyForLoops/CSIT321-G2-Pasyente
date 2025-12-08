package com.csit321.appdev.pasyente.service;

import org.springframework.stereotype.Service;

import com.csit321.appdev.pasyente.entity.User;
import com.csit321.appdev.pasyente.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // Register user with email
    public User register(String name, String email, String password) {
        // Check if username or email already exists
        Optional<User> existingByName = userRepo.findByName(name);
        Optional<User> existingByEmail = userRepo.findByEmail(email);
        if (existingByName.isPresent() || existingByEmail.isPresent()) {
            return null; // user exists
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        return userRepo.save(user);
    }

    // Login by email
    public User loginByEmail(String email, String password) {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        return null;
    }
}
