package com.itypd.yingweng.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "treatment")
public class Treatment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "record_id", nullable = false)
    private Long recordId;
    
    @Column(name = "treatment_name", nullable = false, length = 200)
    private String treatmentName;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String remarks;
    
    @Column(name = "created_time")
    private LocalDateTime createdTime;
    
    @PrePersist
    protected void onCreate() {
        createdTime = LocalDateTime.now();
    }
}

