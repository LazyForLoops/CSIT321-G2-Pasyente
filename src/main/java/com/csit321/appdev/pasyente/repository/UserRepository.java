package com.csit321.appdev.pasyente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321.appdev.pasyente.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String name);  // Find user by name for login
}
