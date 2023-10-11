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

import com.example.project_team.dto.LoanDTO;
import com.example.project_team.service.LoanMemberService;



@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/loanList")
public class LoanMemberController {
	
	private static final Logger logger = LoggerFactory.getLogger(LoanMemberController.class);
	
	@Autowired
	private LoanMemberService service;
	
	// List
	@GetMapping
	public List<LoanDTO> LoanList(HttpServletRequest req, Model model)
		throws ServletException, IOException {
		logger.info("<<< LoanAdminController - LoanList() >>>");
		
		return service.listAll(req, model);
	}
	
	// 1건 select
	@GetMapping("/{num}")
	public LoanDTO fetchLoanByNum(@PathVariable int num)
		throws ServletException, IOException {
		logger.info("<<< LoanAdminController - fetchLoanByNum() >>>");
		return service.selectLoan(num);
	}
	
}
