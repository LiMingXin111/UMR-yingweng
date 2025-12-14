package com.itypd.yingweng.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false, length = 50)
    private String uid;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false, length = 20)
    private String role; // DOCTOR or PATIENT
    
    @Column(length = 100)
    private String name;
    
    @Column(length = 20)
    private String phone;
    
    @Column(length = 100)
    private String email;
    
    @Column(name = "created_time")
    private LocalDateTime createdTime;
    
    @PrePersist
    protected void onCreate() {
        createdTime = LocalDateTime.now();
    }
}

