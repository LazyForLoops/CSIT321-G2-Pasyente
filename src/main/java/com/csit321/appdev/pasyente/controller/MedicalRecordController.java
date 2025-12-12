package com.csit321.appdev.pasyente.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csit321.appdev.pasyente.entity.MedicalRecords;
import com.csit321.appdev.pasyente.repository.MedicalRecordRepository;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "*")
public class MedicalRecordController {

    private final MedicalRecordRepository recordRepository;

    public MedicalRecordController(MedicalRecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @GetMapping
    public List<MedicalRecords> getRecords(@RequestParam String userEmail) {
        return recordRepository.findByUserEmailOrderByRecordDateDesc(userEmail);
    }

    @PostMapping
    public ResponseEntity<MedicalRecords> create(@RequestBody MedicalRecords body) {
        if (body.getUserEmail() == null || body.getDescription() == null) {
            return ResponseEntity.badRequest().build();
        }
        if (body.getRecordDate() == null) {
            body.setRecordDate(LocalDate.now());
        }
        MedicalRecords saved = recordRepository.save(body);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!recordRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        recordRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

