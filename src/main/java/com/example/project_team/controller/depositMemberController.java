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
import com.example.project_team.service.depositMemberServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/depositList")
public class depositMemberController {
	
	private static final Logger logger = LoggerFactory.getLogger(depositMemberController.class);
	
	@Autowired
	private depositMemberServiceImpl service;
	
	//list
	@GetMapping
	public List<DepositDTO> DepositList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
			logger.info("<<< depositMemberController - DepositList() >>>");
			
			return service.listAll(req, model);
	}
	
	//1건 select
	@GetMapping("/{yeNo}")
	public DepositDTO fetchDepositByNum(@PathVariable int yeNo)
		throws ServletException, IOException {
		logger.info("<<< depositMemberController - fetchDepositByNum() >>>");
		return service.selectDeposit(yeNo);
	}

}
