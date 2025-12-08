package com.csit321.appdev.pasyente.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321.appdev.pasyente.entity.Appointments;

public interface AppointmentRepository extends JpaRepository<Appointments, Long> {
    List<Appointments> findByUserEmailOrderByAppointmentDateTimeAsc(String userEmail);
}

