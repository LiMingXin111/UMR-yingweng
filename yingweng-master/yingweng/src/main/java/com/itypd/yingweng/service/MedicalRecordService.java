package com.itypd.yingweng.service;

import com.itypd.yingweng.entity.MedicalRecord;
import com.itypd.yingweng.entity.Medicine;
import com.itypd.yingweng.entity.Treatment;
import com.itypd.yingweng.repository.MedicalRecordRepository;
import com.itypd.yingweng.repository.MedicineRepository;
import com.itypd.yingweng.repository.TreatmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class MedicalRecordService {
    
    @Autowired
    private MedicalRecordRepository medicalRecordRepository;
    
    @Autowired
    private MedicineRepository medicineRepository;
    
    @Autowired
    private TreatmentRepository treatmentRepository;
    
    @Transactional
    public MedicalRecord createRecord(MedicalRecord record) {
        return medicalRecordRepository.save(record);
    }
    
    @Transactional
    public MedicalRecord updateRecord(Long recordId, MedicalRecord updatedRecord, Long currentDoctorId) {
        MedicalRecord record = medicalRecordRepository.findById(recordId).orElse(null);
        if (record == null) {
            return null;
        }
        
        // Only the doctor who created the record can modify it
        if (!record.getDoctorId().equals(currentDoctorId)) {
            throw new RuntimeException("You do not have permission to modify this record");
        }
        
        record.setDiseaseName(updatedRecord.getDiseaseName());
        record.setDescription(updatedRecord.getDescription());
        record.setPriorityLevel(updatedRecord.getPriorityLevel());
        record.setStatus(updatedRecord.getStatus());
        record.setRemarks(updatedRecord.getRemarks());
        
        return medicalRecordRepository.save(record);
    }
    
    @Transactional
    public boolean deleteRecord(Long recordId, Long currentDoctorId) {
        MedicalRecord record = medicalRecordRepository.findById(recordId).orElse(null);
        if (record == null) {
            return false;
        }
        
        // Only the doctor who created the record can delete it
        if (!record.getDoctorId().equals(currentDoctorId)) {
            throw new RuntimeException("You do not have permission to delete this record");
        }
        
        medicalRecordRepository.deleteById(recordId);
        return true;
    }
    
    public List<MedicalRecord> getPatientRecords(Long patientId) {
        return medicalRecordRepository.findByPatientIdOrderByCreatedTimeDesc(patientId);
    }
    
    public MedicalRecord getRecordById(Long recordId) {
        return medicalRecordRepository.findById(recordId).orElse(null);
    }
    
    public List<MedicalRecord> searchRecords(Long patientId, String keyword) {
        return medicalRecordRepository.searchByPatientIdAndKeyword(patientId, keyword);
    }

    private MedicalRecord requireRecord(Long recordId) {
        if (recordId == null) {
            throw new RuntimeException("Record ID is required");
        }
        MedicalRecord record = medicalRecordRepository.findById(recordId).orElse(null);
        if (record == null) {
            throw new RuntimeException("Record not found");
        }
        return record;
    }

    private void requireDoctorOwnsRecord(Long recordId, Long currentDoctorId) {
        MedicalRecord record = requireRecord(recordId);
        if (!record.getDoctorId().equals(currentDoctorId)) {
            throw new RuntimeException("You do not have permission to modify this record");
        }
    }
    
    @Transactional
    public Medicine addMedicine(Medicine medicine, Long currentDoctorId) {
        requireDoctorOwnsRecord(medicine.getRecordId(), currentDoctorId);
        return medicineRepository.save(medicine);
    }
    
    @Transactional
    public Treatment addTreatment(Treatment treatment, Long currentDoctorId) {
        requireDoctorOwnsRecord(treatment.getRecordId(), currentDoctorId);
        return treatmentRepository.save(treatment);
    }

    @Transactional
    public Medicine updateMedicine(Long medicineId, Medicine updatedMedicine, Long currentDoctorId) {
        Medicine medicine = medicineRepository.findById(medicineId).orElse(null);
        if (medicine == null) {
            return null;
        }
        requireDoctorOwnsRecord(medicine.getRecordId(), currentDoctorId);

        medicine.setMedicineName(updatedMedicine.getMedicineName());
        medicine.setDosage(updatedMedicine.getDosage());
        medicine.setFrequency(updatedMedicine.getFrequency());
        medicine.setDuration(updatedMedicine.getDuration());
        medicine.setRemarks(updatedMedicine.getRemarks());

        return medicineRepository.save(medicine);
    }

    @Transactional
    public Treatment updateTreatment(Long treatmentId, Treatment updatedTreatment, Long currentDoctorId) {
        Treatment treatment = treatmentRepository.findById(treatmentId).orElse(null);
        if (treatment == null) {
            return null;
        }
        requireDoctorOwnsRecord(treatment.getRecordId(), currentDoctorId);

        treatment.setTreatmentName(updatedTreatment.getTreatmentName());
        treatment.setDescription(updatedTreatment.getDescription());
        treatment.setRemarks(updatedTreatment.getRemarks());

        return treatmentRepository.save(treatment);
    }
    
    public List<Medicine> getMedicinesByRecordId(Long recordId) {
        return medicineRepository.findByRecordId(recordId);
    }
    
    public List<Treatment> getTreatmentsByRecordId(Long recordId) {
        return treatmentRepository.findByRecordId(recordId);
    }
    
    @Transactional
    public boolean deleteMedicine(Long medicineId, Long currentDoctorId) {
        Medicine medicine = medicineRepository.findById(medicineId).orElse(null);
        if (medicine == null) {
            return false;
        }
        requireDoctorOwnsRecord(medicine.getRecordId(), currentDoctorId);
        medicineRepository.deleteById(medicineId);
        return true;
    }
    
    @Transactional
    public boolean deleteTreatment(Long treatmentId, Long currentDoctorId) {
        Treatment treatment = treatmentRepository.findById(treatmentId).orElse(null);
        if (treatment == null) {
            return false;
        }
        requireDoctorOwnsRecord(treatment.getRecordId(), currentDoctorId);
        treatmentRepository.deleteById(treatmentId);
        return true;
    }
}
