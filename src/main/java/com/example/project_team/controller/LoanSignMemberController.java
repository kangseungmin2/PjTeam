package com.example.project_team.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.LoanDTO;
import com.example.project_team.dto.LoanSignDTO;
import com.example.project_team.service.LoanSignMemberService;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/loanSign")
public class LoanSignMemberController {

	private static final Logger logger = LoggerFactory.getLogger(LoanSignMemberController.class);
	
	@Autowired
	private LoanSignMemberService service;
	
	// 1건 select
	@GetMapping("/{num}")
	public LoanDTO fetchLoanByNum(@PathVariable int num)
		throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - fetchLoanByNum() >>>");
		return service.selectLoan(num);
	}
	
	// 계좌조회List
	@GetMapping("/e/{id}")
	public List<AccountDTO> LoanList(@PathVariable String id)
		throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - LoanList() >>>");
		return service.listAll(id);
	}
	
	// 계좌와 비밀번호 체크
	@GetMapping("/f/{accountNum}/{id}")
	public int accountPwCheck (@PathVariable long accountNum, @PathVariable String id)
		throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - accountPwCheck() >>>");
		return service.pwCheck(accountNum, id);
	}
	
	// sign테이블에 insert
	@PostMapping
	public Map<String, Object> signInsert(@RequestBody LoanSignDTO dto)
		throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - signInsert() >>>");
		
		int insertCnt=0;
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			insertCnt=service.insertSign(dto);
			if(insertCnt==1) {
				resultCode="333";
				resultMsg="signInsert success♥️";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="444";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		
		System.out.println("[signInsert 성공!]");
		return map;
	}
	
}
