package com.csit321.appdev.pasyente.dto;

import com.csit321.appdev.pasyente.entity.MedicalRecords;

public class MedicalRecordResponse {
    private Long recordID;
    private String description;
    private Long doctorID;
    private String doctorName;
    private Long patientID;
    private String patientName;

    public MedicalRecordResponse(MedicalRecords record) {
        this.recordID = record.getRecordID();
        this.description = record.getDescription();
        this.doctorID = record.getDoctor() != null ? record.getDoctor().getDoctorId() : null;
        this.doctorName = record.getDoctor() != null && record.getDoctor().getUser() != null
                          ? record.getDoctor().getUser().getName() : null;
        this.patientID = record.getPatient() != null ? record.getPatient().getPatientId() : null;
        this.patientName = record.getPatient() != null && record.getPatient().getUser() != null
                           ? record.getPatient().getUser().getName() : null;
    }

    // Getters only
    public Long getRecordID() { return recordID; }
    public String getDescription() { return description; }
    public Long getDoctorID() { return doctorID; }
    public Long getPatientID() { return patientID; }
    public String getDoctorName() { return doctorName; }
    public String getPatientName() { return patientName; }
}
