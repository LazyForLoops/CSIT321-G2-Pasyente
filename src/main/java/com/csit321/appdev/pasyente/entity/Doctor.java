package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// import java.util.List;

@Entity
@Table(name = "DOCTOR")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;
  
    public void setDoctorId(Long doctorId){
        this.doctorId = doctorId;
    }
    public Long getDoctorId(){
        return doctorId;
    }

}
