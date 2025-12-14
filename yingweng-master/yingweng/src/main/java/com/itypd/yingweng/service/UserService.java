package com.itypd.yingweng.service;

import com.itypd.yingweng.entity.User;
import com.itypd.yingweng.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public User login(String uid, String password) {
        Optional<User> userOpt = userRepository.findByUid(uid);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return userOpt.get();
        }
        return null;
    }
    
    public User register(String password, String role, String name, String phone, String email) {
        // Generate unique UID
        String uid = generateUid(role);
        
        User user = new User();
        user.setUid(uid);
        user.setPassword(password);
        user.setRole(role);
        user.setName(name);
        user.setPhone(phone);
        user.setEmail(email);
        
        return userRepository.save(user);
    }
    
    private String generateUid(String role) {
        String prefix = role.equals("DOCTOR") ? "DOC" : "PAT";
        String uid;
        do {
            uid = prefix + String.format("%06d", (int)(Math.random() * 999999));
        } while (userRepository.existsByUid(uid));
        return uid;
    }
    
    public User findByUid(String uid) {
        return userRepository.findByUid(uid).orElse(null);
    }
    
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    public User updateUserProfile(Long userId, User updatedUser) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Update only allowed fields (not uid, role, or password)
            if (updatedUser.getName() != null && !updatedUser.getName().trim().isEmpty()) {
                user.setName(updatedUser.getName());
            }
            if (updatedUser.getPhone() != null) {
                user.setPhone(updatedUser.getPhone());
            }
            if (updatedUser.getEmail() != null) {
                user.setEmail(updatedUser.getEmail());
            }
            
            return userRepository.save(user);
        }
        return null;
    }
}

