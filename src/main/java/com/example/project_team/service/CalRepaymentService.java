package com.example.project_team.service;

import java.io.IOException;

import javax.servlet.ServletException;

import com.example.project_team.dto.CalRepaymentDTO;


public interface CalRepaymentService {

	// insert
	public int insertRepayment(CalRepaymentDTO dto)
			throws ServletException, IOException;
	
	// select
	public CalRepaymentDTO selectRepayment(int repaymentNum)
			throws ServletException, IOException;
}
