package com.example.project_team.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.project_team.dto.IdentityDTO;
import com.example.project_team.service.IdentityService;

@RestController
@RequestMapping("/loanSign")
public class IdentityController {

    @Autowired
    private IdentityService identityService;

    @PostMapping("/upload-image")
    public String uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("identityNum") int identityNum) {
        try {
            // 파일 저장 및 IdentityDTO 생성 및 저장
        	// Google Vision API는 이미지의 바이트 배열을 처리하므로 이미지 파일을 바이트 배열로 변환
            byte[] imageBytes = file.getBytes();
            
            IdentityDTO identity = new IdentityDTO();
            identity.setName(name);
            identity.setIdentityNum(identityNum);
            identity.setImage(imageBytes);
            
            identityService.insertIdentity(identity, file);

            return "Image uploaded and saved successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error uploading image: " + e.getMessage();
        }
    }
    
    @PostMapping("/extract-text")
    public String extractText(@RequestBody String image) {
        // 여기서 Vision API를 사용하여 이미지에서 텍스트를 추출하는 작업을 수행
        // image 매개변수는 이미지를 저장한 경로 또는 정보를 받아와서 Vision API 요청을 보냅니다.
        // 추출된 텍스트를 반환합니다.

        String extractedText = "Extracted text from the image"; // 추출된 텍스트 (실제 Vision API 응답을 사용)

        return extractedText;
    }
    
}
