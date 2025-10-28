package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;

import java.util.List;

public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointments> appointments;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private List<Doctor> doctor;

    public void setPatientId(Long patientId){
        this.patientId = patientId;
    }
    public Long getUserId(){
        return patientId;
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
