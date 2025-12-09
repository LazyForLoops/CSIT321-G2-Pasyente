package com.csit321.appdev.pasyente.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // Get all appointments
    @GetMapping
    public List<Appointments> getAllAppointments() {
        return appointmentsRepository.findAll();
    }

    // Get appointments by patient ID
    @GetMapping("/patient/{patientId}")
    public List<Appointments> getAppointmentsByPatient(@PathVariable Long patientId) {
        return appointmentsRepository.findByPatientPatientId(patientId);
    }

    // Add a new appointment
    @PostMapping
    public ResponseEntity<?> addAppointment(@RequestBody AppointmentRequest request) {
        try {
            Patient patient = patientRepository.findById(request.getPatientId())
                    .orElseThrow(() -> new RuntimeException("Patient not found"));
            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            Appointments appointment = new Appointments();
            
            // Parse the appointment date from string to LocalDateTime
            if (request.getAppointmentDate() != null && !request.getAppointmentDate().isEmpty()) {
                LocalDateTime dateTime = LocalDateTime.parse(request.getAppointmentDate(), 
                    DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                appointment.setAppointmentDate(dateTime);
            }
            
            appointment.setReason(request.getReason());
            appointment.setStatus(request.getStatus() != null ? request.getStatus() : "Pending");
            appointment.setPatient(patient);
            appointment.setDoctor(doctor);

            Appointments savedAppointment = appointmentsRepository.save(appointment);
            return ResponseEntity.ok(savedAppointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // DTO for creating a new appointment
    public static class AppointmentRequest {
        private String appointmentDate;
        private String reason;
        private String status;
        private Long doctorId;
        private Long patientId;

        public String getAppointmentDate() { return appointmentDate; }
        public void setAppointmentDate(String appointmentDate) { this.appointmentDate = appointmentDate; }

        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public Long getDoctorId() { return doctorId; }
        public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

        public Long getPatientId() { return patientId; }
        public void setPatientId(Long patientId) { this.patientId = patientId; }
    }
}
