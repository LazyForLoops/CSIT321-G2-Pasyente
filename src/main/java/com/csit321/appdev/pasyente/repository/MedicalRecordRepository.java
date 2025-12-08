package com.csit321.appdev.pasyente.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321.appdev.pasyente.entity.MedicalRecords;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecords, Long> {
    List<MedicalRecords> findByUserEmailOrderByRecordDateDesc(String userEmail);
}

