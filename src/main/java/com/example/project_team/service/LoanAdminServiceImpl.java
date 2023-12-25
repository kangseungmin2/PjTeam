package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.LoanDTO;
import com.example.project_team.mappers.LoanAdminMapper;

@Service
public class LoanAdminServiceImpl implements LoanAdminService {

	@Autowired
	private LoanAdminMapper dao;
	
	@Override
	public List<LoanDTO> listAll(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("LoanAdminServiceImpl - listAll");
		return dao.LoanAdminList();
	}

	@Override
	public int insertLoan(LoanDTO dto) throws ServletException, IOException {
		System.out.println("LoanAdminServiceImpl - insertLoan");
		return dao.insertLoan(dto);
	}

	@Override
	public int updateLoan(LoanDTO dto) throws ServletException, IOException {
		System.out.println("LoanAdminServiceImpl - updateLoan");
		return dao.updateLoan(dto);
	}

	@Override
	public int deleteLoan(int num) throws ServletException, IOException {
		System.out.println("LoanAdminServiceImpl - deleteLoan");
		return dao.deleteByNum(num);
	}

	@Override
	public LoanDTO selectLoan(int num) throws ServletException, IOException {
		System.out.println("LoanAdminServiceImpl - selectLoan");
		return dao.findByNum(num);
	}

}
