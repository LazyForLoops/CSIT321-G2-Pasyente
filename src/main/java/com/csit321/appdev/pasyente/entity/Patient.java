package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "PATIENT")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patient_id;
    @OneToMany
    private List<Appointments> appointments;
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private List<Doctor> doctor;

    public void setPatientId(Long patientId){
        this.patient_id = patientId;
    }
    public Long getPatientId(){
        return patient_id;
    }

    public void setDoctor(List<Doctor> doctor){
        this.doctor = doctor;
    }
    public List<Doctor> getDoctor() {
        return doctor;
    }
    public void setAppointments(List<Appointments> appointments){
        this.appointments = appointments;
    }
    public List<Appointments> getAppointments(){
        return appointments;
    }
}
