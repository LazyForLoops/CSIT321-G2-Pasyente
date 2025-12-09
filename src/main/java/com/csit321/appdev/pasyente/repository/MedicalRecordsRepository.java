package com.csit321.appdev.pasyente.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csit321.appdev.pasyente.entity.MedicalRecords;

@Repository
public interface MedicalRecordsRepository extends JpaRepository<MedicalRecords, Long> {
    List<MedicalRecords> findByPatientPatientId(Long patientId);
    List<MedicalRecords> findByDoctorDoctorId(Long doctorId);
    List<MedicalRecords> findByPatientPatientIdAndDoctorDoctorId(Long patientId, Long doctorId);
}

