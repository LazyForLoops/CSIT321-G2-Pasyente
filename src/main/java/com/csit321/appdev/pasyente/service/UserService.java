package com.csit321.appdev.pasyente.service;

import org.springframework.stereotype.Service;

import com.csit321.appdev.pasyente.entity.User;
import com.csit321.appdev.pasyente.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // Register user
    public User register(String name, String password) {
        User existing = userRepo.findByName(name);
        if (existing != null) return null; // user exists
        User user = new User(name, password);
        return userRepo.save(user);
    }

    // Login user
    public User login(String name, String password) {
        User user = userRepo.findByName(name);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
