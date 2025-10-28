package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Student")
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentID;
    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    public Long getAppointmentID(){
        return appointmentID;
    }
    public void setAppointmentID(Long appointmentID){
        this.appointmentID = appointmentID;
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
    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
    public Doctor getDoctor() {
        return doctor;
    }
}
