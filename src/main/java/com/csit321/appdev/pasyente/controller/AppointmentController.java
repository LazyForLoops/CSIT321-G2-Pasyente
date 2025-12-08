package com.csit321.appdev.pasyente.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csit321.appdev.pasyente.entity.Appointments;
import com.csit321.appdev.pasyente.repository.AppointmentRepository;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;

    public AppointmentController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping
    public List<Appointments> getAppointments(@RequestParam String userEmail) {
        return appointmentRepository.findByUserEmailOrderByAppointmentDateTimeAsc(userEmail);
    }

    @PostMapping
    public ResponseEntity<Appointments> create(@RequestBody Appointments body) {
        if (body.getUserEmail() == null || body.getTitle() == null) {
            return ResponseEntity.badRequest().build();
        }

        // Fallback to now when no date-time supplied
        if (body.getAppointmentDateTime() == null) {
            body.setAppointmentDateTime(LocalDateTime.now());
        }

        Appointments saved = appointmentRepository.save(body);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!appointmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        appointmentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

