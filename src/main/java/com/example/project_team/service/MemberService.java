package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import com.example.project_team.dto.UserDTO;
import com.example.project_team.entities.User;

public interface MemberService {

	public User memberInfo(String id)
			throws ServletException, IOException;
	
	public int memberEdit(User dto)
			throws ServletException, IOException;
	
	// 관리자 회원관리
	public List<UserDTO> management() 
			throws ServletException, IOException;
}
