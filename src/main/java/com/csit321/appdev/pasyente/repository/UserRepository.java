// package com.csit321.appdev.pasyente.repository;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.csit321.appdev.pasyente.entity.User;

// public interface UserRepository extends JpaRepository<User, Long> {
//     User findByName(String name);
//     User findByEmail(String email);
// }

package com.csit321.appdev.pasyente.repository;

import com.csit321.appdev.pasyente.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name); // <- change to Optional
}
