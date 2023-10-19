package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.LoanDTO;
import com.example.project_team.mappers.LoanMemberMapper;

@Service
public class LoanMemberServiceImpl implements LoanMemberService {

	@Autowired
	private LoanMemberMapper dao;
	
	@Override
	public List<LoanDTO> listAll(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("LoanMemberServiceImpl - listAll");
		return dao.LoanMemberList();
	}

	@Override
	public LoanDTO selectLoan(int num) throws ServletException, IOException {
		System.out.println("LoanMemberServiceImpl - selectLoan");
		return dao.findByNum(num);
	}

}
