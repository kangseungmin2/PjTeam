package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.TransferDTO;
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
			throws ServletException, IOException;
	
	// limitAccount
	public List<AccountDTO> limitAccount(String id)
			throws ServletException, IOException;
		
	// changeLimit
	public AccountDTO changeLimit(int accountNum)
			throws ServletException, IOException;
	
}
