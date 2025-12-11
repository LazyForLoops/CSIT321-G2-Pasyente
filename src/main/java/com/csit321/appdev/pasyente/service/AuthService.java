package com.csit321.appdev.pasyente.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.csit321.appdev.pasyente.entity.Doctor;
import com.csit321.appdev.pasyente.entity.Patient;
import com.csit321.appdev.pasyente.entity.User;
import com.csit321.appdev.pasyente.repository.DoctorRepository;
import com.csit321.appdev.pasyente.repository.PatientRepository;
import com.csit321.appdev.pasyente.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AuthService(UserRepository userRepository,
                       PatientRepository patientRepository,
                       DoctorRepository doctorRepository) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @Transactional
    public User registerUser(String name, String email, String password, String role) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Default to "Patient" if role is not provided
        if (role == null || role.isEmpty()) {
            role = "Patient";
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        user = userRepository.save(user);

        if ("Patient".equalsIgnoreCase(role)) {
            Patient patient = new Patient();
            patient.setUser(user);
            patientRepository.save(patient);
        } else if ("Doctor".equalsIgnoreCase(role)) {
            Doctor doctor = new Doctor();
            doctor.setUser(user);
            doctorRepository.save(doctor);
        }

        return user;
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
