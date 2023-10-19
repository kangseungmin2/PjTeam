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

import com.example.project_team.dto.DepositDTO;
import com.example.project_team.dto.SavingsDTO;
import com.example.project_team.service.savingsAdminServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/savingsProductList")
public class savingsAdminController {
	
	private static final Logger logger = LoggerFactory.getLogger(savingsAdminController.class);
	
	@Autowired
	private savingsAdminServiceImpl service;
	
	//list
	@GetMapping
	public List<SavingsDTO> SavingsList(HttpServletRequest req, Model model)
	throws ServletException, IOException{
		logger.info("<<<savingsAdminServiceImpl-SavingsList()>>>");
		
		return service.listAll(req, model);
	}
	
	//insert
	@PostMapping
	public Map<String, Object> SavingsInsert(@RequestBody SavingsDTO dto)
	throws ServletException, IOException{
		logger.info("<<<savingsAdminServiceImpl-SavingsInsert()>>>");
		
		int insertCnt=0;
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			insertCnt=service.insertSavings(dto);
			if(insertCnt==1) {
				resultCode="0";
				resultMsg="Insert success";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="1";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		
		System.out.println("[Insert 성공!]");
		return map;
	}
	
	//1건 select
	@GetMapping("/{juckNo}")
	public SavingsDTO fetchSavingsByNum(@PathVariable int juckNo)
			throws ServletException, IOException {
		logger.info("<<<savingsAdminServiceImpl-fetchSavingsByNum()>>>");
		return service.selectSavings(juckNo);
	}
	
	//update
	@PutMapping("/{juckNo}")
	public Map<String, Object> savingsUpdate(@PathVariable int juckNo, @RequestBody SavingsDTO dto)
		throws ServletException, IOException {
		logger.info("<<<savingsAdminServiceImpl-savingsUpdate()>>>");
		
		int updateCnt=0;
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			updateCnt=service.updateSavings(dto);
			if(updateCnt==1) {
				resultCode="0";
				resultMsg="Update success";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="1";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		
		System.out.println("[Update 성공!]");
		return map;
	}
	
	//delete
	@DeleteMapping("/{juckNo}")
	public Map<String, Object> savingsDelete(@PathVariable int juckNo)
		throws ServletException, IOException {
		logger.info("<<<savingsAdminServiceImpl-savingsDelete()>>>");
		
		int deleteCnt=0;
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			deleteCnt=service.deleteSavings(juckNo);
			if(deleteCnt==1) {
				resultCode="0";
				resultMsg="Delete success";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="1";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		
		System.out.println("[Delete 성공!]");
		return map;
	}
		
}
