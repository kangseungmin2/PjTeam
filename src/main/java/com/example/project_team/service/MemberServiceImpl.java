package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.UserDTO;
import com.example.project_team.entities.User;
import com.example.project_team.mappers.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
	private MemberMapper mapper;
	@Override
	public User memberInfo(String id) throws ServletException, IOException {
		System.out.println("service - memberInfo");
		
		return mapper.memberInfo(id);
	}
	@Override
	public int memberEdit(User dto) throws ServletException, IOException {
		System.out.println("service - memberInfo");
		System.out.println("dto"+dto);
		return mapper.memberEdit(dto);
	}

	// 관리자 회원관리
	public List<UserDTO> management() 
			throws ServletException, IOException {
		System.out.println("서비스 - 회원관리");
		return mapper.management();
	}
}
