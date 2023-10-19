package com.example.project_team.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.project_team.dto.IdentityDTO;
import com.example.project_team.mappers.IdentityMapper;

@Service
public class IdentityServiceImpl implements IdentityService {

	@Autowired
	private IdentityMapper dao;
	
	 @Autowired
	    public IdentityServiceImpl(IdentityMapper dao) {
	        this.dao = dao;
	    }

	    @Override
	    public void insertIdentity(IdentityDTO dto, MultipartFile file) {
	        try {
	            byte[] imageBytes = file.getBytes();
	            dto.setImage(imageBytes);
	            dao.save(dto);
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new RuntimeException("Error uploading image: " + e.getMessage());
	        }
	    }

	    @Override
	    public String selectIdentity(MultipartFile image) {
	        // 이미지에서 텍스트 추출하는 작업을 수행
	        // image MultipartFile을 Vision API로 보내고 추출된 텍스트를 반환
	        // 여기에서 Vision API를 호출하고 추출된 텍스트를 리턴하도록 수정해야 합니다.
	        return "Extracted text from the image"; // 실제 Vision API 응답을 사용
	    }


}
