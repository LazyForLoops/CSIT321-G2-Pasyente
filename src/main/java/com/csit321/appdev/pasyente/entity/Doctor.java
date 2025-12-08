package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;

// @Entity
// @Table(name = "DOCTOR")
// public class Doctor {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long doctorId;

//     @OneToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "user_id")
//     private User user;

//     public void setDoctorId(Long doctorId){
//         this.doctorId = doctorId;
//     }
//     public Long getDoctorId(){
//         return doctorId;
//     }

//     public void setUser(User user) { this.user = user; }
//     public User getUser() { return user; }
// }

@Entity
@Table(name = "DOCTOR")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
