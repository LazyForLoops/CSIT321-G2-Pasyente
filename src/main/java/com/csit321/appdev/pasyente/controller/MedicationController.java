package com.csit321.appdev.pasyente.controller;

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

import com.csit321.appdev.pasyente.entity.Medication;
import com.csit321.appdev.pasyente.repository.MedicationRepository;

@RestController
@RequestMapping("/api/medications")
@CrossOrigin(origins = "*")
public class MedicationController {

    private final MedicationRepository medicationRepository;

    public MedicationController(MedicationRepository medicationRepository) {
        this.medicationRepository = medicationRepository;
    }

    @GetMapping
    public List<Medication> getMedications(@RequestParam String userEmail) {
        return medicationRepository.findByUserEmailOrderByNameAsc(userEmail);
    }

    @PostMapping
    public ResponseEntity<Medication> create(@RequestBody Medication body) {
        if (body.getUserEmail() == null || body.getName() == null) {
            return ResponseEntity.badRequest().build();
        }
        Medication saved = medicationRepository.save(body);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!medicationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        medicationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

