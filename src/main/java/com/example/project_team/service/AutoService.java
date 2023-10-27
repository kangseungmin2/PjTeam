package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.AutoDTO;
import com.example.project_team.dto.TransferDTO;

public interface AutoService {

	// list
	public List<AutoDTO> autoList(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	// autoDetail
	public AutoDTO autoDetail(int autoNum)
			throws ServletException, IOException;
	
	// autoAccount
	public List<AccountDTO> autoAccount(String id)
			throws ServletException, IOException;
	
	// autoWithdrawal
	public void autoWithdrawal(AutoDTO dto)
			throws ServletException, IOException;
		
	// changeAuto
	public AutoDTO changeAuto(int autoNum)
			throws ServletException, IOException;
	
	// alterAutoDate
	public AutoDTO alterAutoDate(int autoNum)
			throws ServletException, IOException;
	
	
}
