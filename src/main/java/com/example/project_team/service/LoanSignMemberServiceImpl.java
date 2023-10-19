package com.example.project_team.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.LoanDTO;
import com.example.project_team.dto.LoanSignDTO;
import com.example.project_team.mappers.LoanSignMemberMapper;

@Service
public class LoanSignMemberServiceImpl implements LoanSignMemberService {

	@Autowired
	private LoanSignMemberMapper dao;
	
	// 대출 상세정보
	@Override
	public LoanDTO selectLoan(int num) throws ServletException, IOException {
		System.out.println("LoanSignMemberServiceImpl - selectLoan");
		return dao.findByNum(num);
	}

	// 계좌 조회
	@Override
	public List<AccountDTO> listAll(String id) throws ServletException, IOException {
		System.out.println("LoanSignMemberServiceImpl - listAll");
		return dao.accountList(id);
	}

	// 계좌 비밀번호 체크
	@Override
	public int pwCheck(long accountNum, String id) throws ServletException, IOException {
		System.out.println("LoanSignMemberServiceImpl - listAll");
		Map<String, Object> list = new HashMap<String, Object>();
		list.put("accountNum",accountNum);
		list.put("id",id);
		return dao.pwCheck(list);
	}
	
	// sign테이블 insert
	@Override
	public int insertSign(LoanSignDTO dto) throws ServletException, IOException {
		System.out.println("LoanSignMemberServiceImpl - insertSign");
		return dao.insertSign(dto);
	}


}
