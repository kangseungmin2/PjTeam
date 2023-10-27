package com.example.project_team.service;

import java.io.IOException;

import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.DepositDTO;
import com.example.project_team.dto.DepositSignDTO;

public interface depositSignMemberService {

	// 예금상품 상세정보 부르기
	public DepositDTO selectDeposit(int yeNo)
			throws ServletException, IOException;
	
	// 계좌정보 부르기
	public List<AccountDTO> listAll(String id)
			throws ServletException, IOException;
	
	// 계좌와 비밀번호 체크
	public int pwCheck (long accountNum, String id)
			throws ServletException, IOException;
	
	// 가입 insert
	public int insertSign(DepositSignDTO dto)
			throws ServletException, IOException;
	
	 public List<DepositSignDTO> depositSignList(String id)
	         throws ServletException, IOException;
}
