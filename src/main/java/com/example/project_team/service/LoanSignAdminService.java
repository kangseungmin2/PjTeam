package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.LoanSignDTO;


public interface LoanSignAdminService {

	// 대출 신청 목록
	public List<LoanSignDTO> listAll(HttpServletRequest req, Model model)
		throws ServletException, IOException;
	
	// 1건
	public LoanSignDTO selectSign(int loanNum)
			throws ServletException, IOException;
	
	// 대출 신청 승인 update
	public int signSuccess(LoanSignDTO dto)
			throws ServletException, IOException;
	
	// 대출 신청 반려 update
	public int signFail(LoanSignDTO dto)
			throws ServletException, IOException;
}
