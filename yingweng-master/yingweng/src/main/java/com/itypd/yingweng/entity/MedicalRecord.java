package com.itypd.yingweng.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "medical_record")
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "patient_id", nullable = false)
    private Long patientId;
    
    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;
    
    @Column(name = "disease_name", nullable = false, length = 200)
    private String diseaseName;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "priority_level")
    private Integer priorityLevel = 4; // 1-Red Critical, 2-Yellow Severe, 3-Orange Urgent, 4-Blue Non-urgent, 5-Green Completed
    
    @Column(length = 20)
    private String status = "IN_PROGRESS"; // IN_PROGRESS, COMPLETED
    
    @Column(columnDefinition = "TEXT")
    private String remarks;
    
    @Column(name = "created_time")
    private LocalDateTime createdTime;
    
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;
    
    @OneToMany(mappedBy = "recordId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Medicine> medicines = new ArrayList<>();
    
    @OneToMany(mappedBy = "recordId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Treatment> treatments = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdTime = LocalDateTime.now();
        updatedTime = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedTime = LocalDateTime.now();
    }
}

