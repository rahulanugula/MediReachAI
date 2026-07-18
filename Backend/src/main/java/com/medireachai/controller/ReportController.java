package com.medireachai.controller;

import com.medireachai.model.Patient;
import com.medireachai.model.Report;
import com.medireachai.repository.PatientRepository;
import com.medireachai.repository.ReportRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportRepository repo;
    private final PatientRepository patientRepository;

    public ReportController(ReportRepository repo, PatientRepository patientRepository) {
        this.repo = repo;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<Report> getAll() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "createdAt", "id"));
    }

    @PostMapping
    public Report create(@RequestBody Report report) {
        hydratePatientDetails(report);
        report.setCreatedAt(LocalDateTime.now());
        if (!StringUtils.hasText(report.getStatus())) {
            report.setStatus("Pending");
        }
        return repo.save(report);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Report deleted"));
    }

    private void hydratePatientDetails(Report report) {
        patientRepository.findAll().stream()
                .filter(patient -> matchesPatient(report, patient))
                .findFirst()
                .ifPresent(patient -> {
                    if (!StringUtils.hasText(report.getPatientName())) {
                        report.setPatientName(patient.getName());
                    }
                    if (!StringUtils.hasText(report.getMrn())) {
                        report.setMrn(patient.getMrn());
                    }
                });
    }

    private boolean matchesPatient(Report report, Patient patient) {
        boolean mrnMatch = StringUtils.hasText(report.getMrn())
                && report.getMrn().equalsIgnoreCase(patient.getMrn());
        boolean nameMatch = StringUtils.hasText(report.getPatientName())
                && report.getPatientName().equalsIgnoreCase(patient.getName());
        return mrnMatch || nameMatch;
    }
}
