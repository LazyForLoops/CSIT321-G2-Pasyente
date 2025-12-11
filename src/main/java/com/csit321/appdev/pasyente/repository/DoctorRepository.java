package com.csit321.appdev.pasyente.repository;

import com.csit321.appdev.pasyente.entity.Doctor;
import com.csit321.appdev.pasyente.entity.Patient;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUserUserId(Long userId);
}
