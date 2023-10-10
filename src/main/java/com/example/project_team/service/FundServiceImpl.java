package com.example.project_team.service;

import java.io.IOException;

import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.FundProductDTO;
import com.example.project_team.mappers.FundMapper;

@Service
public class FundServiceImpl implements FundService{

	@Autowired
	private FundMapper mapper;
	
	// FundList
	@Override
	public List<FundProductDTO> fundList(HttpServletRequest req, Model model)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundList");
		 
		List<FundProductDTO> list =  mapper.fundList();
		System.out.println("list : "+list);
		return list;
	}
	
}
