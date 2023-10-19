package com.example.project_team.service;

import java.io.IOException;

import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.AutoDTO;
import com.example.project_team.mappers.AutoMapper;

@Service
public class AutoServiceImpl implements AutoService{
	
	@Autowired
	private AutoMapper mapper;
	
	@Override
	public List<AutoDTO> autoList(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("AutoServiceImpl - autoList");
		return mapper.autoList();
	}

}
