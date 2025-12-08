// AuthService.java
package com.csit321.appdev.pasyente.service;

import com.csit321.appdev.pasyente.entity.Doctor;
import com.csit321.appdev.pasyente.entity.Patient;
import com.csit321.appdev.pasyente.entity.User;
import com.csit321.appdev.pasyente.repository.DoctorRepository;
import com.csit321.appdev.pasyente.repository.PatientRepository;
import com.csit321.appdev.pasyente.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        user = userRepository.save(user);

        // Create corresponding patient or doctor
        if ("Patient".equalsIgnoreCase(role)) {
            Patient patient = new Patient();
            patientRepository.save(patient);
        } else if ("Doctor".equalsIgnoreCase(role)) {
            Doctor doctor = new Doctor();
            doctorRepository.save(doctor);
        }

        return user;
    }
}
