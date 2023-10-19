package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.SavingsDTO;
import com.example.project_team.mappers.savingsMemberMapper;
@Service
public class savingsMemberServiceImpl implements savingsMemberService{
	
	@Autowired
	private savingsMemberMapper dao;
	
	@Override
	public List<SavingsDTO> listAll(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("savingsMemberServiceImpl - listAll");
		return dao.SavingsMemberList();
	}

	@Override
	public SavingsDTO selectSavings(int juckNo) throws ServletException, IOException {
		System.out.println("savingsMemberServiceImpl - selectSavings");
		return dao.findByNum(juckNo);
	}

}
