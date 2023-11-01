package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.AutoSignDTO;
import com.example.project_team.dto.SavingsDTO;
import com.example.project_team.dto.SavingsSignDTO;
import com.example.project_team.exceptionHandler.CustomException;

public interface savingsSignMemberService {

	// 적금상품 상세정보 부르기
	public SavingsDTO selectSavings(int juckNo)
			throws ServletException, IOException;

	// 계좌정보 부르기
	public List<AccountDTO> listAll(String id)
			throws ServletException, IOException;

	// 계좌와 비밀번호 체크
	public int pwCheck (long accountNum, String id)
			throws ServletException, IOException;

	// 가입 insert
	public int insertSign(SavingsSignDTO dto)
			throws ServletException, IOException;

	public List<SavingsSignDTO> savingsSignList(String id)
			throws ServletException, IOException;

	public void cancelSavings(SavingsSignDTO dto)
			throws CustomException;

	public SavingsSignDTO signList(int juckSignNo)  
			throws ServletException, IOException;

	public void updateRepayment(SavingsSignDTO dto)
			throws CustomException;
	
//	public void autoRepayment(AutoSignDTO dto)
//			throws CustomException;
}
