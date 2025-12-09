package com.csit321.appdev.pasyente.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csit321.appdev.pasyente.entity.Appointments;

@Repository
public interface AppointmentsRepository extends JpaRepository<Appointments, Long> {
}
