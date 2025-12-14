package com.itypd.yingweng.controller;

import com.itypd.yingweng.entity.User;
import com.itypd.yingweng.service.QRCodeService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Controller
public class PageController {
    
    @Autowired
    private QRCodeService qrCodeService;
    
    @GetMapping({"/", "/doctor", "/patient"})
    public String spaEntry() {
        return "forward:/index.html";
    }
    
    @GetMapping("/qrcode/generate")
    @ResponseBody
    public Map<String, Object> generateQRCode(@RequestParam String uid) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            String qrCodeBase64 = qrCodeService.generateQRCodeBase64(uid, 300, 300);
            result.put("success", true);
            result.put("qrCode", "data:image/png;base64," + qrCodeBase64);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        
        return result;
    }

    @PostMapping("/qrcode/decode")
    @ResponseBody
    public Map<String, Object> decodeQRCode(@RequestParam("image") MultipartFile image, HttpSession session) {
        Map<String, Object> result = new HashMap<>();

        User currentUser = (User) session.getAttribute("currentUser");
        if (currentUser == null) {
            result.put("success", false);
            result.put("message", "Please login first");
            return result;
        }
        if (!"DOCTOR".equals(currentUser.getRole())) {
            result.put("success", false);
            result.put("message", "Permission denied");
            return result;
        }
        if (image == null || image.isEmpty()) {
            result.put("success", false);
            result.put("message", "No image uploaded");
            return result;
        }

        try {
            String text = qrCodeService.decodeQRCode(image.getBytes());
            if (text == null || text.isBlank()) {
                result.put("success", false);
                result.put("message", "No QR code found");
                return result;
            }
            result.put("success", true);
            result.put("text", text);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }

        return result;
    }
}
