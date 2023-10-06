package com.example.project_team.controller;

import java.io.IOException;


import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.FundProductDTO;
import com.example.project_team.service.FundServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/fund")
public class FundController {
	
	private static final Logger logger = LoggerFactory.getLogger(FundController.class);
	
	@Autowired
	private FundServiceImpl service; 
	
	// List
	@GetMapping
	public List<FundProductDTO> fundList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< fundController - fundList() >>>");
		
		return service.fundList(req, model);
	}
}
