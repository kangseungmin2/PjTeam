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

import com.example.project_team.dto.FundAccountDTO;
import com.example.project_team.dto.FundProductDTO;
import com.example.project_team.dto.FundTransactionDTO;
import com.example.project_team.service.FundServiceImpl;



@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/fund")
public class FundController {
	
	private static final Logger logger = LoggerFactory.getLogger(FundController.class);
	
	@Autowired
	private FundServiceImpl service;
	
	// fundList
	@GetMapping
	public List<FundProductDTO> fundList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< fundController - fundList() >>>");
		
		return service.fundList(req, model);
	}
	
	// accountList
	@GetMapping("/accountList/{id}")
	public List<FundAccountDTO> accountList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< fundController - fundList() >>>");
		
		return service.accountList(id);
	}
	
	// fundDetail 1건 조회
	@GetMapping("/fundDetail/{fpName}")
	public FundProductDTO fundDetail(@PathVariable String fpName)
			throws ServletException, IOException {
		logger.info("<<< fundController - fundDetail() >>>");
		
		return service.fundDetail(fpName);
	}
	
	// fundAccount 1건 조회
	@GetMapping("/fundAccount/{fAccount}")
	public FundAccountDTO fundAccount(@PathVariable long fAccount)
			throws ServletException, IOException {
		logger.info("<<< fundController - fundAccount() >>>");
		
		return service.fundAccount(fAccount);
	}
	
	// fundAccountSelect 계좌 다건 조회
	@GetMapping("/fundAccountSelect/{id}")
	public List<FundAccountDTO> fundAccountSelect(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< fundController - fundAccountSelect() >>>");
		
		return service.fundAccountSelect(id);
	}
	
	// transactionList 계좌 거래내역 조회
	@GetMapping("/transactionList/{fAccount}")
	public List<FundTransactionDTO> transactionList(@PathVariable long fAccount)
			throws ServletException, IOException {
		logger.info("<<< fundController - transactionList() >>>");
		
		return service.transactionList(fAccount);
	}
}
