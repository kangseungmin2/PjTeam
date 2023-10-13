package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.DepositDTO;
import com.example.project_team.mappers.depositMemberMapper;
@Service
public class depositMemberServiceImpl implements depositMemberService{
	@Autowired
	private depositMemberMapper dao;
	
	@Override
	public List<DepositDTO> listAll(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("depositMemberServiceImpl - listAll");
		return dao.DepositMemberList();
	}

	@Override
	public DepositDTO selectDeposit(int num) throws ServletException, IOException {
		System.out.println("depositMemberServiceImpl - selectLoan");
		return dao.findByNum(num);
	}

}
