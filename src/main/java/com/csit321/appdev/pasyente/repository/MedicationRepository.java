package com.csit321.appdev.pasyente.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321.appdev.pasyente.entity.Medication;

public interface MedicationRepository extends JpaRepository<Medication, Long> {
    List<Medication> findByUserEmailOrderByNameAsc(String userEmail);
}

