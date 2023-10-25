package com.example.project_team.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.CalRepaymentDTO;
import com.example.project_team.dto.LoanDTO;
import com.example.project_team.dto.LoanSignDTO;
import com.example.project_team.service.LoanSignAdminService;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/loanSignConfirm")
public class LoanSignAdminController {

	private static final Logger logger = LoggerFactory.getLogger(LoanSignAdminController.class);

	@Autowired
	private LoanSignAdminService service;

	// 대출 신청 List
	@GetMapping
	public List<LoanSignDTO> LoanList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< LoanSignAdminController - LoanList() >>>");
		List<LoanSignDTO> dto = service.listAll(req, model);
		System.out.println("dto"+dto);
		return service.listAll(req, model);
	}

	// 1건 select
	@GetMapping("/{loanNum}")
	public LoanSignDTO fetchSignByNum(@PathVariable int loanNum)
			throws ServletException, IOException {
		logger.info("<<< LoanSignAdminController - fetchSignByNum() >>>");
		return service.selectSign(loanNum);
	}

	// Update(signSuccess)
	@PutMapping("/s/{loanNum}")
	public Map<String, Object> signSuccess(@PathVariable int loanNum, @RequestBody LoanSignDTO dto)
			throws ServletException, IOException {
		logger.info("<<< LoanSignAdminController - signSuccess() >>>");

		int updateCnt=0;
		String resultCode="";
		String resultMsg="";

		Map<String, Object> map = new HashMap<String, Object>();
		try {
			updateCnt=service.signSuccess(dto);
			if(updateCnt==1) {
				resultCode="333";
				resultMsg="signSuccess success♥️";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="444";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);

		System.out.println("[signSuccess 성공!]");
		return map;
	}

	// 대출계산 insert
	@GetMapping("/c/{loanNum}")
	public List<Map<String,Object>> repayment(@PathVariable int loanNum)
			throws ServletException, IOException {
		logger.info("<<< LoanSignAdminController - repayment() >>>");
		System.out.println("대출계산해보자");
		
		return service.repayment(loanNum);
	}
	// 대출계산(이자조회)
	@PostMapping("/r")
	public int repaymentInsert(@RequestBody CalRepaymentDTO dto)
			throws ServletException, IOException {
		logger.info("<<< LoanSignAdminController - repaymentInsert() >>>");
		return service.insertRepayment(dto);
	}
	
	// Update(signFail)
	@PutMapping("/f/{loanNum}")
	public Map<String, Object> signFail(@PathVariable int loanNum, @RequestBody LoanSignDTO dto)
			throws ServletException, IOException {
		logger.info("<<< LoanSignAdminController - signFail() >>>");

		int updateCnt=0;
		String resultCode="";
		String resultMsg="";

		Map<String, Object> map = new HashMap<String, Object>();
		try {
			updateCnt=service.signFail(dto);
			if(updateCnt==1) {
				resultCode="333";
				resultMsg="signFail success♥️";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="444";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);

		System.out.println("[signFail 성공!]");
		return map;
	}
}
