// package com.csit321.appdev.pasyente.entity;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "users")
// public class User {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long userId;

//     private String name;
//     private String password;

//     @Column(nullable = false, unique = true)
//     private String email;

//     // Constructors
//     public User() {}

//     public User(String name, String password, String email) {
//         this.name = name;
//         this.password = password;
//         this.email = email;
//     }

//     // Getters and Setters
//     public Long getUserId() { return userId; }
//     public void setUserId(Long userId) { this.userId = userId; }

//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }

//     public String getPassword() { return password; }
//     public void setPassword(String password) { this.password = password; }

//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }

//     // Login function (for demonstration)
//     public boolean login(String inputPassword) {
//         if (this.password.equals(inputPassword)) {
//             System.out.println("Login successful for " + this.name);
//             return true;
//         } else {
//             System.out.println("Invalid credentials for " + this.name);
//             return false;
//         }
//     }
// }


// User.java
package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String role; // New field: "Patient" or "Doctor"

    public User() {}

    public User(String name, String password, String email, String role) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
