package com.csit321.appdev.pasyente.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csit321.appdev.pasyente.dto.MedicalRecordRequest;
import com.csit321.appdev.pasyente.dto.MedicalRecordResponse;
import com.csit321.appdev.pasyente.entity.Doctor;
import com.csit321.appdev.pasyente.entity.MedicalRecords;
import com.csit321.appdev.pasyente.entity.Patient;
import com.csit321.appdev.pasyente.repository.DoctorRepository;
import com.csit321.appdev.pasyente.repository.MedicalRecordsRepository;
import com.csit321.appdev.pasyente.repository.PatientRepository;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicalRecordsController {

    private final MedicalRecordsRepository medicalRecordsRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public MedicalRecordsController(MedicalRecordsRepository medicalRecordsRepository,
                                    PatientRepository patientRepository,
                                    DoctorRepository doctorRepository) {
        this.medicalRecordsRepository = medicalRecordsRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    // Get all records
    @GetMapping
    public List<MedicalRecordResponse> getAllRecords() {
        return medicalRecordsRepository.findAll()
                .stream()
                .map(MedicalRecordResponse::new)
                .collect(Collectors.toList());
    }

    // Get records by patient
    @GetMapping("/patient/{patientId}")
    public List<MedicalRecordResponse> getRecordsByPatient(@PathVariable Long patientId) {
        return medicalRecordsRepository.findByPatientPatientId(patientId)
                .stream()
                .map(MedicalRecordResponse::new)
                .collect(Collectors.toList());
    }

    // Get records by doctor
    @GetMapping("/doctor/{doctorId}")
    public List<MedicalRecordResponse> getRecordsByDoctor(@PathVariable Long doctorId) {
        return medicalRecordsRepository.findByDoctorDoctorId(doctorId)
                .stream()
                .map(MedicalRecordResponse::new)
                .collect(Collectors.toList());
    }

    // Get records by patient and doctor
    @GetMapping("/patient/{patientId}/doctor/{doctorId}")
    public List<MedicalRecordResponse> getRecordsByPatientAndDoctor(@PathVariable Long patientId, @PathVariable Long doctorId) {
        return medicalRecordsRepository.findByPatientPatientIdAndDoctorDoctorId(patientId, doctorId)
                .stream()
                .map(MedicalRecordResponse::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/my-records/{userId}")
    public List<MedicalRecordResponse> getRecordsForDoctor(@PathVariable Long userId) {
        Doctor doctor = doctorRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return medicalRecordsRepository.findByDoctorDoctorId(doctor.getDoctorId())
                .stream()
                .map(MedicalRecordResponse::new)
                .collect(Collectors.toList());
    }

    // Add a new record
    @PostMapping
    public ResponseEntity<?> addMedicalRecord(@RequestBody MedicalRecordRequest request) {
        try {
            // Validate required fields
            if (request.getPatientId() == null) {
                throw new RuntimeException("Patient ID is required");
            }
            if (request.getDoctorId() == null) {
                throw new RuntimeException("Doctor ID is required");
            }

            // Find patient and doctor by IDs
            Patient patient = patientRepository.findById(request.getPatientId())
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            // Create new medical record
            MedicalRecords record = new MedicalRecords();
            record.setDescription(request.getDescription());
            record.setPatient(patient);
            record.setDoctor(doctor);

            MedicalRecords savedRecord = medicalRecordsRepository.save(record);

            return ResponseEntity.ok(new MedicalRecordResponse(savedRecord));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



    //delet
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalRecord(@PathVariable Long id) {
        if (medicalRecordsRepository.existsById(id)) {
            medicalRecordsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //edit
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMedicalRecord(@PathVariable Long id, @RequestBody MedicalRecordRequest request) {
        try {
            MedicalRecords record = medicalRecordsRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Medical record not found"));

            // Update description if provided
            if (request.getDescription() != null) {
                record.setDescription(request.getDescription());
            }

            // Update doctor if doctorId provided
            if (request.getDoctorId() != null) {
                Doctor doctor = doctorRepository.findById(request.getDoctorId())
                        .orElseThrow(() -> new RuntimeException("Doctor not found"));
                record.setDoctor(doctor);
            }

            // Update patient if patientId provided
            if (request.getPatientId() != null) {
                Patient patient = patientRepository.findById(request.getPatientId())
                        .orElseThrow(() -> new RuntimeException("Patient not found"));
                record.setPatient(patient);
            }

            MedicalRecords updatedRecord = medicalRecordsRepository.save(record);
            return ResponseEntity.ok(new MedicalRecordResponse(updatedRecord));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
