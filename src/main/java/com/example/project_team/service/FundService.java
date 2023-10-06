package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.FundProductDTO;

public interface FundService {
	// FundList
	public List<FundProductDTO> fundList(HttpServletRequest req, Model model)
			throws ServletException, IOException;
}
 