package com.csit321.appdev.pasyente.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "administrators")
public class Administrator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;

    private String name;

    // One administrator can manage many users
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "admin_id")
    private List<User> users = new ArrayList<>();

    // Constructors
    public Administrator() {}

    public Administrator(String name) {
        this.name = name;
    }

    // Getters and Setters
    public Long getAdminId() { return adminId; }
    public void setAdminId(Long adminId) { this.adminId = adminId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<User> getUsers() { return users; }
    public void setUsers(List<User> users) { this.users = users; }

    // Functions to manage users
    public void addUser(User user) {
        users.add(user);
        System.out.println("Added user: " + user.getName());
    }

    public User searchUser(Long userId) {
        for (User user : users) {
            if (user.getUserId().equals(userId)) {
                System.out.println("Found user: " + user.getName());
                return user;
            }
        }
        System.out.println("User not found.");
        return null;
    }

    public void removeUser(Long userId) {
        users.removeIf(user -> {
            boolean match = user.getUserId().equals(userId);
            if (match) System.out.println("Removed user: " + user.getName());
            return match;
        });
    }
}
