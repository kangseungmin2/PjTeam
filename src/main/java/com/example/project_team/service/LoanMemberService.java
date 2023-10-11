package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.LoanDTO;

public interface LoanMemberService {

	public List<LoanDTO> listAll(HttpServletRequest req, Model model)
		throws ServletException, IOException;
	
	public LoanDTO selectLoan(int num)
			throws ServletException, IOException;
}
