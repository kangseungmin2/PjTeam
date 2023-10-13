package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.SavingsDTO;


public interface savingsAdminService {
		public List<SavingsDTO> listAll(HttpServletRequest req, Model model)
			throws ServletException, IOException;
		
		public int insertSavings(SavingsDTO dto)
				throws ServletException, IOException;
		
		public int updateSavings(SavingsDTO dto)
				throws ServletException, IOException;
		
		public int deleteSavings(int num)
				throws ServletException, IOException;
		
		public SavingsDTO selectSavings(int num)
				throws ServletException, IOException;
}
