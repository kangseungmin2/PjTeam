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

import com.example.project_team.dto.QuestionDTO;
import com.example.project_team.service.QuestionServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/question")
public class QuestionController {
	private static final Logger logger = LoggerFactory.getLogger(QuestionController.class);
	
	@Autowired
	private QuestionServiceImpl service;
	
	// List
	@GetMapping
	public List<QuestionDTO> questionList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< fundController - questionList() >>>");
		
		return service.questionList(req, model);
	}
	
}

