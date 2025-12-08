package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "PATIENT")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patient_id;
 
    public void setPatientId(Long patientId){
        this.patient_id = patientId;
    }
    public Long getPatientId(){
        return patient_id;
    }

}
