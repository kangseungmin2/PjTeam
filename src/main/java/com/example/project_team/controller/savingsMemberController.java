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

import com.example.project_team.dto.DepositDTO;
import com.example.project_team.dto.SavingsDTO;
import com.example.project_team.service.savingsMemberServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/savingsList")
public class savingsMemberController {

	private static final Logger logger = LoggerFactory.getLogger(savingsMemberController.class);
	
	@Autowired
	private savingsMemberServiceImpl service;

	//list
	@GetMapping
	public List<SavingsDTO> SavingsList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
			logger.info("<<< savingsMemberServiceImpl - SavingsList() >>>");
			
			return service.listAll(req, model);
	}
	
	//1건 select
	@GetMapping("/{jNo}")
	public SavingsDTO fetchSavingsByNum(@PathVariable int num)
		throws ServletException, IOException {
		logger.info("<<< savingsMemberServiceImpl - fetchSavingsByNum() >>>");
		return service.selectSavings(num);
	}
}
