package com.csit321.appdev.pasyente.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csit321.appdev.pasyente.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // @PostMapping("/register")
    // public ResponseEntity<User> registerUser(@RequestBody User user) {
    //     User savedUser = userService.register(user.getName(), user.getEmail(), user.getPassword());
    //     if (savedUser == null) {
    //         return ResponseEntity.status(409).build(); // Conflict if user/email exists
    //     }
    //     return ResponseEntity.ok(savedUser);
    // }

}

