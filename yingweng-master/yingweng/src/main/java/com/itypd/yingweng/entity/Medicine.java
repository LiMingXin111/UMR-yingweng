package com.itypd.yingweng.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "medicine")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "record_id", nullable = false)
    private Long recordId;
    
    @Column(name = "medicine_name", nullable = false, length = 200)
    private String medicineName;
    
    @Column(length = 100)
    private String dosage;
    
    @Column(length = 100)
    private String frequency;
    
    @Column(length = 100)
    private String duration;
    
    @Column(columnDefinition = "TEXT")
    private String remarks;
    
    @Column(name = "created_time")
    private LocalDateTime createdTime;
    
    @PrePersist
    protected void onCreate() {
        createdTime = LocalDateTime.now();
    }
}

