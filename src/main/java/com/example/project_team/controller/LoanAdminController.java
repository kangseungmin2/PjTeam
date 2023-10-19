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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.LoanDTO;
import com.example.project_team.service.LoanAdminService;



@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/loanProductList")
public class LoanAdminController {
	
	private static final Logger logger = LoggerFactory.getLogger(LoanAdminController.class);
	
	@Autowired
	private LoanAdminService service;
	
	// List
	@GetMapping
	public List<LoanDTO> LoanList(HttpServletRequest req, Model model)
		throws ServletException, IOException {
		logger.info("<<< LoanAdminController - LoanList() >>>");
		
		return service.listAll(req, model);
	}
	
	// Insert
	@PostMapping
	public Map<String, Object> loanInsert(@RequestBody LoanDTO dto)
		throws ServletException, IOException {
		logger.info("<<< LoanAdminController - loanInsert() >>>");
		
		int insertCnt=0;
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			insertCnt=service.insertLoan(dto);
			if(insertCnt==1) {
				resultCode="333";
				resultMsg="loanInsert success♥️";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="444";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		
		System.out.println("[loanInsert 성공!]");
		return map;
	}
	
	// 1건 select
	@GetMapping("/{num}")
	public LoanDTO fetchLoanByNum(@PathVariable int num)
		throws ServletException, IOException {
		logger.info("<<< LoanAdminController - fetchLoanByNum() >>>");
		return service.selectLoan(num);
	}
	
	// Update
	@PutMapping("/{num}")
	public Map<String, Object> loanUpdate(@PathVariable int num, @RequestBody LoanDTO dto)
			throws ServletException, IOException {
			logger.info("<<< LoanAdminController - loanUpdate() >>>");
			
			int updateCnt=0;
			String resultCode="";
			String resultMsg="";
			
			Map<String, Object> map = new HashMap<String, Object>();
			try {
				updateCnt=service.updateLoan(dto);
				if(updateCnt==1) {
					resultCode="333";
					resultMsg="loanUpdate success♥️";
				}
			} catch(Exception e) {
				e.printStackTrace();
				resultCode="444";
				resultMsg=e.getMessage();
			}
			map.put("resultCode", resultCode);
			map.put("resultMsg", resultMsg);
			
			System.out.println("[loanUpdate 성공!]");
			return map;
		}
	
	// Delete
	@DeleteMapping("/{num}")
	public Map<String, Object> loanDelete(@PathVariable int num)
			throws ServletException, IOException {
			logger.info("<<< LoanAdminController - loanDelete() >>>");
			
			int deleteCnt=0;
			String resultCode="";
			String resultMsg="";
			
			Map<String, Object> map = new HashMap<String, Object>();
			try {
				deleteCnt=service.deleteLoan(num);
				if(deleteCnt==1) {
					resultCode="333";
					resultMsg="loanDelete success♥️";
				}
			} catch(Exception e) {
				e.printStackTrace();
				resultCode="444";
				resultMsg=e.getMessage();
			}
			map.put("resultCode", resultCode);
			map.put("resultMsg", resultMsg);
			
			System.out.println("[loanDelete 성공!]");
			return map;
		}
}
