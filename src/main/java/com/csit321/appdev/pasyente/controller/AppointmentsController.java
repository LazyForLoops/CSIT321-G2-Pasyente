package com.csit321.appdev.pasyente.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.csit321.appdev.pasyente.entity.Appointments;
import com.csit321.appdev.pasyente.entity.Doctor;
import com.csit321.appdev.pasyente.entity.Patient;
import com.csit321.appdev.pasyente.repository.AppointmentsRepository;
import com.csit321.appdev.pasyente.repository.DoctorRepository;
import com.csit321.appdev.pasyente.repository.PatientRepository;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentsController {

    private final AppointmentsRepository appointmentsRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentsController(AppointmentsRepository appointmentsRepository,
                                  PatientRepository patientRepository,
                                  DoctorRepository doctorRepository) {
        this.appointmentsRepository = appointmentsRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    // Fetch appointments for a patient
    @GetMapping("/patient/{patientId}")
    public List<Appointments> getAppointmentsByPatient(@PathVariable Long patientId) {
        return appointmentsRepository.findByPatientPatientId(patientId);
    }

    // Fetch appointments for a doctor
    @GetMapping("/doctor/{doctorId}")
    public List<Appointments> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        return appointmentsRepository.findByDoctorDoctorId(doctorId);
    }

    // Create a new appointment
    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentRequest request) {
        if (request.getPatientId() == null || request.getDoctorId() == null) {
            return ResponseEntity.badRequest().body("Patient and Doctor are required");
        }

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointments appt = new Appointments();
        appt.setPatient(patient);
        appt.setDoctor(doctor);
        appt.setReason(request.getReason());
        appt.setAppointmentDate(request.getAppointmentDate() != null ? request.getAppointmentDate() : LocalDateTime.now());
        appt.setStatus("Pending");

        return ResponseEntity.ok(appointmentsRepository.save(appt));
    }

    // Update appointment status: Confirm, Deny, Aborted
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Appointments appt = appointmentsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!status.equals("Confirmed") && !status.equals("Denied") && !status.equals("Aborted")) {
            return ResponseEntity.badRequest().body("Invalid status");
        }

        appt.setStatus(status);
        return ResponseEntity.ok(appointmentsRepository.save(appt));
    }
}

// DTO for requests
class AppointmentRequest {
    private Long patientId;
    private Long doctorId;
    private String reason;
    private LocalDateTime appointmentDate;

    // getters & setters
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public LocalDateTime getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDateTime appointmentDate) { this.appointmentDate = appointmentDate; }
}
