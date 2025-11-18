package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "DOCTOR")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctor_id;
 /*   @OneToMany
    private List<Appointments> appointments;*/ 
  
    public void setDoctorId(Long doctorId){
        this.doctor_id = doctorId;
    }
    public Long getDoctorId(){
        return doctor_id;
    }

    /*public void setAppointments(List<Appointments> appointments){
        this.appointments = appointments;
    }
    public List<Appointments> getAppointments(){
        return appointments;
    }*/
}
