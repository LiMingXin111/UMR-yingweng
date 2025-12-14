package com.itypd.yingweng.controller;

import com.itypd.yingweng.entity.MedicalRecord;
import com.itypd.yingweng.entity.Medicine;
import com.itypd.yingweng.entity.Treatment;
import com.itypd.yingweng.entity.User;
import com.itypd.yingweng.service.MedicalRecordService;
import com.itypd.yingweng.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/records")
public class MedicalRecordController {
    
    @Autowired
    private MedicalRecordService recordService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/create")
    @ResponseBody
    public Map<String, Object> createRecord(@RequestBody MedicalRecord record, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null || !currentUser.getRole().equals("DOCTOR")) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }
        
        try {
            record.setDoctorId(currentUser.getId());
            MedicalRecord savedRecord = recordService.createRecord(record);
            result.put("success", true);
            result.put("record", savedRecord);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        
        return result;
    }
    
    @PutMapping("/update/{recordId}")
    @ResponseBody
    public Map<String, Object> updateRecord(@PathVariable Long recordId, 
                                             @RequestBody MedicalRecord record,
                                             HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null || !currentUser.getRole().equals("DOCTOR")) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }
        
        try {
            MedicalRecord updatedRecord = recordService.updateRecord(recordId, record, currentUser.getId());
            if (updatedRecord != null) {
                result.put("success", true);
                result.put("record", updatedRecord);
            } else {
                result.put("success", false);
                result.put("message", "Record not found");
            }
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        
        return result;
    }
    
    @DeleteMapping("/delete/{recordId}")
    @ResponseBody
    public Map<String, Object> deleteRecord(@PathVariable Long recordId, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null || !currentUser.getRole().equals("DOCTOR")) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }
        
        try {
            boolean deleted = recordService.deleteRecord(recordId, currentUser.getId());
            result.put("success", deleted);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        
        return result;
    }
    
    @GetMapping("/patient/{patientUid}")
    @ResponseBody
    public Map<String, Object> getPatientRecords(@PathVariable String patientUid, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null) {
            result.put("success", false);
            result.put("message", "Please login first");
            return result;
        }
        
        User patient = userService.findByUid(patientUid);
        if (patient == null) {
            result.put("success", false);
            result.put("message", "Patient not found");
            return result;
        }
        
        List<MedicalRecord> records = recordService.getPatientRecords(patient.getId());
        result.put("success", true);
        result.put("records", records);
        result.put("patient", patient);
        
        return result;
    }
    
    @GetMapping("/detail/{recordId}")
    @ResponseBody
    public Map<String, Object> getRecordDetail(@PathVariable Long recordId) {
        Map<String, Object> result = new HashMap<>();
        
        MedicalRecord record = recordService.getRecordById(recordId);
        if (record != null) {
            List<Medicine> medicines = recordService.getMedicinesByRecordId(recordId);
            List<Treatment> treatments = recordService.getTreatmentsByRecordId(recordId);
            
            result.put("success", true);
            result.put("record", record);
            result.put("medicines", medicines);
            result.put("treatments", treatments);
        } else {
            result.put("success", false);
            result.put("message", "Record not found");
        }
        
        return result;
    }
    
    @GetMapping("/search")
    @ResponseBody
    public Map<String, Object> searchRecords(@RequestParam String patientUid,
                                              @RequestParam String keyword,
                                              HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null) {
            result.put("success", false);
            result.put("message", "Please login first");
            return result;
        }
        
        User patient = userService.findByUid(patientUid);
        if (patient == null) {
            result.put("success", false);
            result.put("message", "Patient not found");
            return result;
        }
        
        List<MedicalRecord> records = recordService.searchRecords(patient.getId(), keyword);
        result.put("success", true);
        result.put("records", records);
        
        return result;
    }
    
    @PostMapping("/medicine/add")
    @ResponseBody
    public Map<String, Object> addMedicine(@RequestBody Medicine medicine, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null || !currentUser.getRole().equals("DOCTOR")) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }
        
        try {
            Medicine savedMedicine = recordService.addMedicine(medicine, currentUser.getId());
            result.put("success", true);
            result.put("medicine", savedMedicine);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        
        return result;
    }

    @PutMapping("/medicine/update/{medicineId}")
    @ResponseBody
    public Map<String, Object> updateMedicine(@PathVariable Long medicineId, @RequestBody Medicine medicine, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");

        if (currentUser == null || !currentUser.getRole().equals("DOCTOR")) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }

        try {
            Medicine updatedMedicine = recordService.updateMedicine(medicineId, medicine, currentUser.getId());
            if (updatedMedicine != null) {
                result.put("success", true);
                result.put("medicine", updatedMedicine);
            } else {
                result.put("success", false);
                result.put("message", "Medicine not found");
            }
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }

        return result;
    }
    
    @PostMapping("/treatment/add")
    @ResponseBody
    public Map<String, Object> addTreatment(@RequestBody Treatment treatment, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null || !currentUser.getRole().equals("DOCTOR")) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }
        
        try {
            Treatment savedTreatment = recordService.addTreatment(treatment, currentUser.getId());
            result.put("success", true);
            result.put("treatment", savedTreatment);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        
        return result;
    }

    @PutMapping("/treatment/update/{treatmentId}")
    @ResponseBody
    public Map<String, Object> updateTreatment(@PathVariable Long treatmentId, @RequestBody Treatment treatment, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");

        if (currentUser == null || !currentUser.getRole().equals("DOCTOR")) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }

        try {
            Treatment updatedTreatment = recordService.updateTreatment(treatmentId, treatment, currentUser.getId());
            if (updatedTreatment != null) {
                result.put("success", true);
                result.put("treatment", updatedTreatment);
            } else {
                result.put("success", false);
                result.put("message", "Treatment not found");
            }
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }

        return result;
    }
    
    @DeleteMapping("/medicine/delete/{medicineId}")
    @ResponseBody
    public Map<String, Object> deleteMedicine(@PathVariable Long medicineId, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null || !currentUser.getRole().equals("DOCTOR")) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }
        
        try {
            boolean deleted = recordService.deleteMedicine(medicineId, currentUser.getId());
            result.put("success", deleted);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        
        return result;
    }
    
    @DeleteMapping("/treatment/delete/{treatmentId}")
    @ResponseBody
    public Map<String, Object> deleteTreatment(@PathVariable Long treatmentId, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null || !currentUser.getRole().equals("DOCTOR")) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }
        
        try {
            boolean deleted = recordService.deleteTreatment(treatmentId, currentUser.getId());
            result.put("success", deleted);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        
        return result;
    }
}
