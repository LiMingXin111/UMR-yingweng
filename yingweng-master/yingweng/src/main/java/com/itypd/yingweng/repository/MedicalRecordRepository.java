package com.itypd.yingweng.repository;

import com.itypd.yingweng.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByPatientIdOrderByCreatedTimeDesc(Long patientId);
    List<MedicalRecord> findByDoctorIdOrderByCreatedTimeDesc(Long doctorId);
    
    @Query("SELECT m FROM MedicalRecord m WHERE m.patientId = :patientId AND " +
           "(m.diseaseName LIKE %:keyword% OR m.description LIKE %:keyword% OR m.remarks LIKE %:keyword%)")
    List<MedicalRecord> searchByPatientIdAndKeyword(@Param("patientId") Long patientId, @Param("keyword") String keyword);
}

