package com.example.project_team.service;

import java.io.IOException;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.CalRepaymentDTO;
import com.example.project_team.mappers.CalRepaymentMapper;

@Service
public class CalRepaymentServiceImpl implements CalRepaymentService {

	@Autowired
	private CalRepaymentMapper dao;
	
	@Override
	public int insertRepayment(CalRepaymentDTO dto) throws ServletException, IOException {
		return dao.insertRepayment(dto);
	}

	@Override
	public CalRepaymentDTO selectRepayment(int repaymentNum) throws ServletException, IOException {
		return dao.findByNum(repaymentNum);
	}

}
