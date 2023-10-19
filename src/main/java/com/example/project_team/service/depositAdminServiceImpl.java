package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.DepositDTO;
import com.example.project_team.mappers.depositAdminMapper;
@Service
public class depositAdminServiceImpl implements depositAdminService{
    @Autowired
	private depositAdminMapper dao;
	
	@Override
	public List<DepositDTO> listAll(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("depositAdminServiceImpl - listAll");
		return dao.DepositAdminList();
	}

	@Override
	public int insertDeposit(DepositDTO dto) throws ServletException, IOException {
		System.out.println("depositAdminServiceImpl - insertDeposit");
		return dao.insertDeposit(dto);
	}

	@Override
	public int updateDeposit(DepositDTO dto) throws ServletException, IOException {
		System.out.println("depositAdminServiceImpl - updateDeposit");
		return dao.updateDeposit(dto);
	}

	@Override
	public int deleteDeposit(int yeNo) throws ServletException, IOException {
		System.out.println("depositAdminServiceImpl - deleteDeposit");
		return dao.deleteByNum(yeNo);
	}

	@Override
	public DepositDTO selectDeposit(int yeNo) throws ServletException, IOException {
		System.out.println("depositAdminServiceImpl - selectDeposit");
		return dao.findByNum(yeNo);
	}

}
