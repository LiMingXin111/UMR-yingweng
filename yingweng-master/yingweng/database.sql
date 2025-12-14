-- Create database
CREATE DATABASE IF NOT EXISTS medical_records CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medical_records;

-- User table
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `uid` VARCHAR(50) UNIQUE NOT NULL COMMENT 'Unique user identifier, also used as login account',
    `password` VARCHAR(255) NOT NULL COMMENT 'User password',
    `role` VARCHAR(20) NOT NULL COMMENT 'User role: DOCTOR or PATIENT',
    `name` VARCHAR(100) COMMENT 'User full name',
    `phone` VARCHAR(20) COMMENT 'Contact phone number',
    `email` VARCHAR(100) COMMENT 'Email address',
    `created_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
    INDEX idx_uid (uid),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User table';

-- Medical record table
CREATE TABLE IF NOT EXISTS `medical_record` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `patient_id` BIGINT NOT NULL COMMENT 'Patient ID',
    `doctor_id` BIGINT NOT NULL COMMENT 'Doctor ID who created this record',
    `disease_name` VARCHAR(200) NOT NULL COMMENT 'Disease name',
    `description` TEXT COMMENT 'Disease description',
    `priority_level` INT DEFAULT 4 COMMENT 'Priority: 1-Red Critical, 2-Yellow Severe, 3-Orange Urgent, 4-Blue Non-urgent, 5-Green Completed',
    `status` VARCHAR(20) DEFAULT 'IN_PROGRESS' COMMENT 'Status: IN_PROGRESS or COMPLETED',
    `remarks` TEXT COMMENT 'Additional remarks',
    `created_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
    `updated_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
    FOREIGN KEY (patient_id) REFERENCES user(id),
    FOREIGN KEY (doctor_id) REFERENCES user(id),
    INDEX idx_patient (patient_id),
    INDEX idx_doctor (doctor_id),
    INDEX idx_priority (priority_level),
    INDEX idx_created_time (created_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Medical record table';

-- Medicine table
CREATE TABLE IF NOT EXISTS `medicine` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `record_id` BIGINT NOT NULL COMMENT 'Medical record ID',
    `medicine_name` VARCHAR(200) NOT NULL COMMENT 'Medicine name',
    `dosage` VARCHAR(100) COMMENT 'Dosage amount',
    `frequency` VARCHAR(100) COMMENT 'Usage frequency',
    `duration` VARCHAR(100) COMMENT 'Treatment duration',
    `remarks` TEXT COMMENT 'Additional remarks',
    `created_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
    FOREIGN KEY (record_id) REFERENCES medical_record(id) ON DELETE CASCADE,
    INDEX idx_record (record_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Medicine table';

-- Treatment table
CREATE TABLE IF NOT EXISTS `treatment` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `record_id` BIGINT NOT NULL COMMENT 'Medical record ID',
    `treatment_name` VARCHAR(200) NOT NULL COMMENT 'Treatment method name',
    `description` TEXT COMMENT 'Treatment description',
    `remarks` TEXT COMMENT 'Additional remarks',
    `created_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
    FOREIGN KEY (record_id) REFERENCES medical_record(id) ON DELETE CASCADE,
    INDEX idx_record (record_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Treatment table';

-- Insert test data
-- Insert doctor users
INSERT INTO user (uid, password, role, name, phone, email) VALUES 
('DOC001', '123456', 'DOCTOR', 'Dr. Zhang', '13800138001', 'doctor1@hospital.com'),
('DOC002', '123456', 'DOCTOR', 'Dr. Li', '13800138002', 'doctor2@hospital.com');

-- Insert patient users
INSERT INTO user (uid, password, role, name, phone, email) VALUES 
('PAT001', '123456', 'PATIENT', 'John Wang', '13900139001', 'patient1@example.com'),
('PAT002', '123456', 'PATIENT', 'Mary Zhao', '13900139002', 'patient2@example.com');

