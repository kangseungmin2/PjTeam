package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.SavingsDTO;
import com.example.project_team.mappers.savingsAdminMapper;
@Service
public class savingsAdminServiceImpl implements savingsAdminService{
	
	@Autowired
	private savingsAdminMapper dao;
	
	@Override
	public List<SavingsDTO> listAll(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("savingsAdminServiceImpl - listAll");
		return dao.SavingsAdminList();
	}

	@Override
	public int insertSavings(SavingsDTO dto) throws ServletException, IOException {
		System.out.println("savingsAdminServiceImpl - insertSavings");
		return dao.insertSavings(dto);
	}

	@Override
	public int updateSavings(SavingsDTO dto) throws ServletException, IOException {
		System.out.println("savingsAdminServiceImpl - updateSavings");
		return dao.updateSavings(dto);
	}

	@Override
	public int deleteSavings(int num) throws ServletException, IOException {
		System.out.println("savingsAdminServiceImpl - deleteSavings");
		return dao.deleteByNum(num);
	}

	@Override
	public SavingsDTO selectSavings(int num) throws ServletException, IOException {
		System.out.println("savingsAdminServiceImpl - selectSavings");
		return dao.findByNum(num);
	}

}
