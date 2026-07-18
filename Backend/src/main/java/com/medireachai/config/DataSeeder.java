package com.medireachai.config;

import com.medireachai.model.Patient;
import com.medireachai.model.Report;
import com.medireachai.repository.PatientRepository;
import com.medireachai.repository.ReportRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(PatientRepository patientRepo, ReportRepository reportRepo) {
        return args -> {
            if (patientRepo.count() > 0 || reportRepo.count() > 0) {
                return;
            }

            List<Patient> patients = List.of(
                mkPatient("Priya Singh", 34, "Female", "+91 98765 00001", "Hypertension", "A+", "Synced", "Sector 12, Delhi"),
                mkPatient("Rajesh Kumar", 58, "Male", "+91 98765 00002", "Diabetes Type 2", "B+", "Synced", "MG Road, Bangalore"),
                mkPatient("Anita Sharma", 27, "Female", "+91 98765 00003", "None Identified", "O+", "Offline", "Anna Nagar, Chennai"),
                mkPatient("Mohammed Iqbal", 45, "Male", "+91 98765 00004", "Cardiac Risk", "AB-", "Synced", "Banjara Hills, Hyderabad"),
                mkPatient("Sunita Devi", 62, "Female", "+91 98765 00005", "Arthritis", "A-", "Pending", "Lal Bagh, Lucknow"),
                mkPatient("Arjun Nair", 31, "Male", "+91 98765 00006", "Asthma", "B-", "Synced", "Koregaon Park, Pune"),
                mkPatient("Lakshmi Reddy", 50, "Female", "+91 98765 00007", "Thyroid Disorder", "O-", "Synced", "Salt Lake, Kolkata"),
                mkPatient("Vikram Patel", 40, "Male", "+91 98765 00008", "None Identified", "AB+", "Offline", "CG Road, Ahmedabad")
            );

            int mrnStart = 1001;
            for (Patient patient : patients) {
                patient.setMrn("MRN-" + mrnStart++);
            }
            patientRepo.saveAll(patients);

            List<Report> reports = List.of(
                mkReport("Priya Singh", "MRN-1001", "Lab Report", "Dr. Rahul", "Final"),
                mkReport("Rajesh Kumar", "MRN-1002", "Prescription", "Dr. Meena", "Final"),
                mkReport("Anita Sharma", "MRN-1003", "Discharge Summary", "Dr. Rahul", "Pending"),
                mkReport("Mohammed Iqbal", "MRN-1004", "Lab Report", "Dr. Sinha", "Final"),
                mkReport("Sunita Devi", "MRN-1005", "Prescription", "Dr. Meena", "Draft"),
                mkReport("Arjun Nair", "MRN-1006", "Lab Report", "Dr. Rahul", "Final")
            );
            reportRepo.saveAll(reports);

            System.out.println("[DataSeeder] Seeded " + patients.size() + " patients and " + reports.size() + " reports.");
        };
    }

    private Patient mkPatient(String name, int age, String gender, String phone,
                              String risk, String blood, String status, String address) {
        Patient patient = new Patient();
        patient.setName(name);
        patient.setAge(age);
        patient.setGender(gender);
        patient.setPhone(phone);
        patient.setPrimaryRisk(risk);
        patient.setBloodGroup(blood);
        patient.setStatus(status);
        patient.setAddress(address);
        patient.setLastVisit(LocalDate.now().minusDays((long) (Math.random() * 14)));
        return patient;
    }

    private Report mkReport(String patient, String mrn, String type, String doctor, String status) {
        Report report = new Report();
        report.setPatientName(patient);
        report.setMrn(mrn);
        report.setType(type);
        report.setDoctor(doctor);
        report.setStatus(status);
        report.setCreatedAt(LocalDateTime.now().minusDays((long) (Math.random() * 30)));
        return report;
    }
}
