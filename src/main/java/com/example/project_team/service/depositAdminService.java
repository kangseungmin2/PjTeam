package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.DepositDTO;
import com.example.project_team.dto.DepositSignDTO;



public interface depositAdminService {
	public List<DepositDTO> listAll(HttpServletRequest req, Model model)
			throws ServletException, IOException;

	public int insertDeposit(DepositDTO dto)
			throws ServletException, IOException;

	public int updateDeposit(DepositDTO dto)
			throws ServletException, IOException;

	public int deleteDeposit(int yeNo)
			throws ServletException, IOException;

	public DepositDTO selectDeposit(int yeNo)
			throws ServletException, IOException;
	
	
}
