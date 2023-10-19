package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.LoanDTO;
import com.example.project_team.dto.LoanSignDTO;

public interface LoanSignMemberService {

	// 대출상품 상세정보 부르기
	public LoanDTO selectLoan(int num)
			throws ServletException, IOException;
	
	// 계좌정보 부르기
	public List<AccountDTO> listAll(String id)
			throws ServletException, IOException;
	
	// 계좌와 비밀번호 체크
	public int pwCheck (long accountNum, String id)
			throws ServletException, IOException;
	
	// 가입 insert
	public int insertSign(LoanSignDTO dto)
			throws ServletException, IOException;
}
