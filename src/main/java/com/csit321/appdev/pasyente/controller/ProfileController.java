package com.csit321.appdev.pasyente.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csit321.appdev.pasyente.entity.User;
import com.csit321.appdev.pasyente.repository.UserRepository;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final UserRepository userRepository;

    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getProfile(@PathVariable String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{email}")
    public ResponseEntity<User> updateProfile(@PathVariable String email, @RequestBody User payload) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Update profile related fields; ignore email/password changes for now
        Optional.ofNullable(payload.getName()).ifPresent(user::setName);
        Optional.ofNullable(payload.getPhoneNumber()).ifPresent(user::setPhoneNumber);
        Optional.ofNullable(payload.getAddress()).ifPresent(user::setAddress);
        Optional.ofNullable(payload.getLanguage()).ifPresent(user::setLanguage);
        Optional.ofNullable(payload.getNewsletter()).ifPresent(user::setNewsletter);
        Optional.ofNullable(payload.getTwoFactorEnabled()).ifPresent(user::setTwoFactorEnabled);
        Optional.ofNullable(payload.getDateOfBirth()).ifPresent(user::setDateOfBirth);

        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }
}

