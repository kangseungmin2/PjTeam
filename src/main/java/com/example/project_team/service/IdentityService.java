package com.example.project_team.service;


import org.springframework.web.multipart.MultipartFile;

import com.example.project_team.dto.IdentityDTO;



public interface IdentityService {
	
	
	public void insertIdentity(IdentityDTO dto, MultipartFile file);
	
	public String selectIdentity(MultipartFile image);
	

}
