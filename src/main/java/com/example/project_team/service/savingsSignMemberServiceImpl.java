package com.example.project_team.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.SavingsDTO;
import com.example.project_team.dto.SavingsSignDTO;
import com.example.project_team.mappers.savingsSignMemberMapper;
@Service
public class savingsSignMemberServiceImpl implements savingsSignMemberService{
	
	@Autowired
	private savingsSignMemberMapper dao;
	
	// 상세정보
	@Override
	public SavingsDTO selectSavings(int juckNo) throws ServletException, IOException {
		System.out.println("savingsSignMemberServiceImpl - selectSavings");
		return dao.findByNum(juckNo);
	}

	@Override
	public List<AccountDTO> listAll(String id) throws ServletException, IOException {
		System.out.println("savingsSignMemberServiceImpl - listAll");
		return dao.accountList(id);
	}

	@Override
	public int pwCheck(long accountNum, String id) throws ServletException, IOException {
		System.out.println("savingsSignMemberServiceImpl - pwCheck");
		Map<String, Object> list = new HashMap<String, Object>();
		list.put("accountNum",accountNum);
		list.put("id",id);
		return dao.pwCheck(list);
	}

	@Override
	public int insertSign(SavingsSignDTO dto) throws ServletException, IOException {
		System.out.println("savingsSignMemberServiceImpl - insertSign");
		return dao.insertSign(dto);
	}

}
