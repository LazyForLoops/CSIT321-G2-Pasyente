package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medical_records")
public class MedicalRecords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordID;

    @Column(nullable = false)
    private String description;

    private java.time.LocalDate recordDate;

    private String doctorName;

    private String type;

    private String status;

    @Column(nullable = false)
    private String userEmail;

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

    public java.time.LocalDate getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(java.time.LocalDate recordDate) {
        this.recordDate = recordDate;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
