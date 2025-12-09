package com.csit321.appdev.pasyente.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Appointment")
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentID;
    
    @Column(name = "appointment_date")
    private LocalDateTime appointmentDate;
    
    @Column(name = "reason")
    private String reason;
    
    @Column(name = "status")
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id")
    private Patient patient;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    public Long getAppointmentID(){
        return appointmentID;
    }
    public void setAppointmentID(Long appointmentID){
        this.appointmentID = appointmentID;
    }

    public LocalDateTime getAppointmentDate(){
        return appointmentDate;
    }
    public void setAppointmentDate(LocalDateTime appointmentDate){
        this.appointmentDate = appointmentDate;
    }

    public String getReason(){
        return reason;
    }
    public void setReason(String reason){
        this.reason = reason;
    }

    public String getStatus(){
        return status;
    }
    public void setStatus(String status){
        this.status = status;
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
