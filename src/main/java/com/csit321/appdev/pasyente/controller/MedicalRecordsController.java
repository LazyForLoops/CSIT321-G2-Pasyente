// // MedicalRecordsController.java
// package com.csit321.appdev.pasyente.controller;

// import com.csit321.appdev.pasyente.entity.Doctor;
// import com.csit321.appdev.pasyente.entity.MedicalRecords;
// import com.csit321.appdev.pasyente.entity.Patient;
// import com.csit321.appdev.pasyente.repository.DoctorRepository;
// import com.csit321.appdev.pasyente.repository.MedicalRecordsRepository;
// import com.csit321.appdev.pasyente.repository.PatientRepository;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/medical-records")
// @CrossOrigin(origins = "http://localhost:3000")
// public class MedicalRecordsController {

//     private final MedicalRecordsRepository medicalRecordsRepository;
//     private final PatientRepository patientRepository;
//     private final DoctorRepository doctorRepository;

//     public MedicalRecordsController(MedicalRecordsRepository medicalRecordsRepository,
//                                     PatientRepository patientRepository,
//                                     DoctorRepository doctorRepository) {
//         this.medicalRecordsRepository = medicalRecordsRepository;
//         this.patientRepository = patientRepository;
//         this.doctorRepository = doctorRepository;
//     }

//     @GetMapping
//     public List<MedicalRecords> getAllRecords() {
//         return medicalRecordsRepository.findAll();
//     }

//     @PostMapping
//     public ResponseEntity<?> addMedicalRecord(@RequestBody MedicalRecordRequest request) {
//         try {
//             Patient patient = patientRepository.findById(request.getPatientId())
//                     .orElseThrow(() -> new RuntimeException("Patient not found"));
//             Doctor doctor = doctorRepository.findById(request.getDoctorId())
//                     .orElseThrow(() -> new RuntimeException("Doctor not found"));

//             MedicalRecords record = new MedicalRecords();
//             record.setDescription(request.getDescription());
//             record.setPatient(patient);
//             record.setDoctor(doctor);

//             MedicalRecords savedRecord = medicalRecordsRepository.save(record);
//             return ResponseEntity.ok(savedRecord);
//         } catch (RuntimeException e) {
//             return ResponseEntity.badRequest().body(e.getMessage());
//         }
//     }

//     // DTO for creating a new record
//     public static class MedicalRecordRequest {
//         private String description;
//         private Long doctorId;
//         private Long patientId;

//         public String getDescription() { return description; }
//         public void setDescription(String description) { this.description = description; }

//         public Long getDoctorId() { return doctorId; }
//         public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

//         public Long getPatientId() { return patientId; }
//         public void setPatientId(Long patientId) { this.patientId = patientId; }
//     }
// }


package com.csit321.appdev.pasyente.controller;

import com.csit321.appdev.pasyente.dto.MedicalRecordRequest;
import com.csit321.appdev.pasyente.dto.MedicalRecordResponse;
import com.csit321.appdev.pasyente.entity.Doctor;
import com.csit321.appdev.pasyente.entity.Patient;
import com.csit321.appdev.pasyente.entity.MedicalRecords;
import com.csit321.appdev.pasyente.repository.DoctorRepository;
import com.csit321.appdev.pasyente.repository.PatientRepository;
import com.csit321.appdev.pasyente.repository.MedicalRecordsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

    // Add a new record
    @PostMapping
    public ResponseEntity<?> addMedicalRecord(@RequestBody MedicalRecordRequest request) {
        try {
            Patient patient = patientRepository.findById(request.getPatientId())
                    .orElseThrow(() -> new RuntimeException("Patient not found"));
            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

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
}
