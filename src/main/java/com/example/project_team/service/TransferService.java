package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.LimitDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.exceptionHandler.ErrorResponse;


public interface TransferService {
	
	// list
	public List<TransferDTO> transferList(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	// transferDetail
	public TransferDTO transferDetail(int transferNum)
			throws ServletException, IOException;
	
	// transAccount
	public List<AccountDTO> transAccount(String id)
			throws ServletException, IOException;
		
	// oneTransfer
	public void oneTransfer(TransferDTO dto)
			throws CustomException;
	
	// limitAccount
	public List<AccountDTO> limitAccount(String id)
			throws ServletException, IOException;
		
	// changeLimit
	public void changeLimit(LimitDTO dto)
			throws ServletException, IOException;
	
	// transferLimit
	public List<LimitDTO> transferLimit(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	// afterLimit
	public List<LimitDTO> afterLimit(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	// updateLimit
	public void updateLimit(int limitNum, AccountDTO dto)
			throws ServletException, IOException;
		
	// deleteLimit
	public int deleteLimit(int limitNum)
			throws ServletException, IOException;
	
	// adminTransfer
	public List<TransferDTO> adminTransfer(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
}
