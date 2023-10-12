package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.FundAccountDTO;
import com.example.project_team.dto.FundProductDTO;

public interface FundService {
	// fundList
	public List<FundProductDTO> fundList(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	// accountList
	public List<FundAccountDTO> accountList(String id)
			throws ServletException, IOException;
	
	// fundDetail 1건 조회
	public FundProductDTO fundDetail(String fpName)
			throws ServletException, IOException;
	
	// fundAccount 1건 조회
	public FundAccountDTO fundAccount(long fAccount)
			throws ServletException, IOException;
}
 