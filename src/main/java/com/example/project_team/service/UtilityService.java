package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.UtilityDTO;
import com.example.project_team.mappers.UtilityMapper;

@Service
public class UtilityService {

	@Autowired
	private UtilityMapper mapper;
	
//	public int insertAccount(AccountDTO dto) throws ServletException, IOException{
//		System.out.println("서비스 - insert");
//		return mapper.insertAccount(dto);
//	}
//	
	public List<UtilityDTO> utilityList(String id) throws ServletException, IOException {
		System.out.println("서비스 - 전제조회");
		return mapper.utilityList(id);
	}
		
//	public AccountDTO fetchAccountByNum(long accountNum) throws ServletException, IOException{
//		System.out.println("서비스 - fetchAccountByNum");
//		return mapper.fetchAccountByNum(accountNum);
//	}
	
}
