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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.AutoDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.service.AutoServiceImpl;
import com.example.project_team.service.TransferServiceImpl;

@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/auto")
@RestController
public class AutoController {

	@Autowired
	private AutoServiceImpl service;
	
	private static final Logger logger = LoggerFactory.getLogger(AutoController.class);
	
	// List => 자동이체 목록
	@GetMapping
	public List<AutoDTO> autoList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		logger.info("<<<AutoController - autoList>>>");
		
		return service.autoList(req, model); 
	}
	
	
}
