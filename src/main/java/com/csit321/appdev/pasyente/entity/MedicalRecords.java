package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medical_records")
public class MedicalRecords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordID;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @Column(name = "description")
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    public void setRecordID(Long recordID){
        this.recordID = recordID;
    }
    public Long getRecordID(){
        return recordID;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public String getDescription(){
        return description;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
    public Patient getPatient() {
        return patient;
    }
    public void setDoctor(Doctor doctor){
        this.doctor = doctor;
    }
    public Doctor getDoctor(){
        return doctor;
    }
}
