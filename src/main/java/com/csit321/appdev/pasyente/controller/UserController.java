package com.csit321.appdev.pasyente.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csit321.appdev.pasyente.entity.User;
import com.csit321.appdev.pasyente.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // allow React to call
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user.getName(), user.getPassword());
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user.getName(), user.getPassword());
    }
}
