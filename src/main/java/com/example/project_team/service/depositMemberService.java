package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.DepositDTO;



public interface depositMemberService {
	
	public List<DepositDTO> listAll(HttpServletRequest req, Model model)
			throws ServletException, IOException;
		
		public DepositDTO selectDeposit(int yeNo)
				throws ServletException, IOException;
}
