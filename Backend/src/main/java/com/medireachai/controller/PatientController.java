package com.medireachai.controller;

import com.medireachai.model.Patient;
import com.medireachai.repository.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientRepository repo;

    public PatientController(PatientRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Patient> getAll(@RequestParam(required = false) String search) {
        if (StringUtils.hasText(search)) {
            return repo.findByNameContainingIgnoreCaseOrMrnContainingIgnoreCase(search, search);
        }
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Patient create(@RequestBody Patient patient) {
        patient.setMrn(nextMrn());
        patient.setLastVisit(LocalDate.now());
        if (!StringUtils.hasText(patient.getStatus())) {
            patient.setStatus("Synced");
        }
        if (!StringUtils.hasText(patient.getPrimaryRisk())) {
            patient.setPrimaryRisk("None Identified");
        }
        return repo.save(patient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> update(@PathVariable Long id, @RequestBody Patient updated) {
        return repo.findById(id).map(p -> {
            p.setName(updated.getName());
            p.setAge(updated.getAge());
            p.setGender(updated.getGender());
            p.setPhone(updated.getPhone());
            p.setPrimaryRisk(updated.getPrimaryRisk());
            p.setBloodGroup(updated.getBloodGroup());
            p.setAddress(updated.getAddress());
            p.setStatus(updated.getStatus());
            return ResponseEntity.ok(repo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Patient deleted"));
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        List<Patient> patients = repo.findAll();
        long total = patients.size();
        Map<String, Long> byStatus = patients.stream()
                .map(patient -> StringUtils.hasText(patient.getStatus()) ? patient.getStatus() : "Pending")
                .collect(Collectors.groupingBy(status -> status, Collectors.counting()));

        return Map.of(
            "total", total,
            "synced", byStatus.getOrDefault("Synced", 0L),
            "offline", byStatus.getOrDefault("Offline", 0L),
            "pending", byStatus.getOrDefault("Pending", 0L)
        );
    }

    private String nextMrn() {
        int nextNumber = repo.findAll().stream()
                .map(Patient::getMrn)
                .filter(StringUtils::hasText)
                .map(mrn -> mrn.replace("MRN-", ""))
                .filter(value -> value.chars().allMatch(Character::isDigit))
                .map(Integer::parseInt)
                .max(Comparator.naturalOrder())
                .orElse(1000) + 1;
        return "MRN-" + nextNumber;
    }
}
