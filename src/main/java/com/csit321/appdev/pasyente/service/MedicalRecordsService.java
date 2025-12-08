package com.csit321.appdev.pasyente.service;

import com.csit321.appdev.pasyente.entity.MedicalRecords;
import com.csit321.appdev.pasyente.repository.MedicalRecordsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordsService {

    private final MedicalRecordsRepository repository;

    public MedicalRecordsService(MedicalRecordsRepository repository) {
        this.repository = repository;
    }

    public List<MedicalRecords> getAllRecords() {
        return repository.findAll();
    }

    public MedicalRecords addRecord(MedicalRecords record) {
        return repository.save(record);
    }
}
