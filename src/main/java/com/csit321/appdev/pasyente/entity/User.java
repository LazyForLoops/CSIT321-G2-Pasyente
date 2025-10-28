package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    private String password;

    // Constructors
    public User() {}

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    // Login function (for demonstration)
    public boolean login(String inputId, String inputPassword) {
        if (this.password.equals(inputPassword)) {
            System.out.println("Login successful for " + this.name);
            return true;
        } else {
            System.out.println("Invalid credentials for " + this.name);
            return false;
        }
    }
}
