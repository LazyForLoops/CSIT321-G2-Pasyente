package com.csit321.appdev.pasyente.entity;

import jakarta.persistence.*;

// @Entity
// @Table(name = "PATIENT")
// public class Patient {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long patientId;

//     @OneToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "user_id")
//     private User user;

//     public void setPatientId(Long patientId){
//         this.patientId = patientId;
//     }
//     public Long getPatientId(){
//         return patientId;
//     }

//     public void setUser(User user) { this.user = user; }
//     public User getUser() { return user; }
// }


@Entity
@Table(name = "PATIENT")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
