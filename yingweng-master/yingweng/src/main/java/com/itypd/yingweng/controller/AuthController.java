package com.itypd.yingweng.controller;

import com.itypd.yingweng.entity.User;
import com.itypd.yingweng.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    @ResponseBody
    public Map<String, Object> login(@RequestParam String uid, 
                                      @RequestParam String password,
                                      HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        
        User user = userService.login(uid, password);
        if (user != null) {
            session.setAttribute("currentUser", user);
            result.put("success", true);
            result.put("role", user.getRole());
            result.put("uid", user.getUid());
            result.put("name", user.getName());
        } else {
            result.put("success", false);
            result.put("message", "Invalid username or password");
        }
        
        return result;
    }
    
    @PostMapping("/register")
    @ResponseBody
    public Map<String, Object> register(@RequestParam String password,
                                         @RequestParam String role,
                                         @RequestParam String name,
                                         @RequestParam(required = false) String phone,
                                         @RequestParam(required = false) String email) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            User user = userService.register(password, role, name, phone, email);
            result.put("success", true);
            result.put("uid", user.getUid());
            result.put("message", "Registration successful! Your account is: " + user.getUid());
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Registration failed: " + e.getMessage());
        }
        
        return result;
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
    
    @GetMapping("/current")
    @ResponseBody
    public Map<String, Object> getCurrentUser(HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User user = (User) session.getAttribute("currentUser");
        
        if (user != null) {
            result.put("success", true);
            result.put("user", user);
        } else {
            result.put("success", false);
        }
        
        return result;
    }
    
    @PutMapping("/update")
    @ResponseBody
    public Map<String, Object> updateProfile(@RequestBody User updatedUser, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        User currentUser = (User) session.getAttribute("currentUser");
        
        if (currentUser == null) {
            result.put("success", false);
            result.put("message", "Please login first");
            return result;
        }
        
        try {
            User user = userService.updateUserProfile(currentUser.getId(), updatedUser);
            if (user != null) {
                session.setAttribute("currentUser", user); // Update session
                result.put("success", true);
                result.put("user", user);
                result.put("message", "Profile updated successfully");
            } else {
                result.put("success", false);
                result.put("message", "Update failed");
            }
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        
        return result;
    }
}

