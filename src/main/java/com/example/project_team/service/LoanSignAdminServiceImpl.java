package com.example.project_team.service;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.LoanSignDTO;
import com.example.project_team.mappers.LoanSignAdminMapper;

@Service
public class LoanSignAdminServiceImpl implements LoanSignAdminService {

	@Autowired
	private LoanSignAdminMapper dao;

	// 대출 신청 목록
	@Override
	public List<LoanSignDTO> listAll(HttpServletRequest req, Model model) throws ServletException, IOException {
		return dao.signList();
	}

	// 1건
	@Override
	public LoanSignDTO selectSign(int loanNum) throws ServletException, IOException {
		System.out.println("LoanSignAdminServiceImpl - selectLoan");
		return dao.findByNum(loanNum);
	}

	// 승인
	@Override
	public int signSuccess(LoanSignDTO dto) throws ServletException, IOException {
		return dao.signSuccess(dto);
	}

	// 반려
	@Override
	public int signFail(LoanSignDTO dto) throws ServletException, IOException {
		return dao.signFail(dto);
	}



}
