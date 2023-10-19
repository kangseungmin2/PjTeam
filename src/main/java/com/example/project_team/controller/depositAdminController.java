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
import com.example.project_team.service.depositAdminServiceImpl;
@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/depositProductList")
public class depositAdminController {
	
	
	private static final Logger logger = LoggerFactory.getLogger(depositAdminController.class);
	
	@Autowired
	private depositAdminServiceImpl service;

	
	//list
	@GetMapping
	public List<DepositDTO> DepositList(HttpServletRequest req, Model model)
	throws ServletException, IOException{
		logger.info("<<<depositAdminController-DepositList()>>>");
		
		return service.listAll(req, model);
	}
	
	//insert
	@PostMapping
	public Map<String, Object> DepositInsert(@RequestBody DepositDTO dto)
	throws ServletException, IOException{
		logger.info("<<<depositAdminController-DepositInsert()>>>");
		
		int insertCnt=0;
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			insertCnt=service.insertDeposit(dto);
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
		
		System.out.println("[depositInsert 성공!]");
		return map;
	}
	
	//1건 select
	@GetMapping("/{yeNo}")
	public DepositDTO fetchDepositByNum(@PathVariable int yeNo)
			throws ServletException, IOException {
		logger.info("<<<depositAdminController-fetchDepositByNum()>>>");
		return service.selectDeposit(yeNo);
	}
	
	//update
	@PutMapping("/{yeNo}")
	public Map<String, Object> depositUpdate(@PathVariable int yeNo,@RequestBody DepositDTO dto)
		throws ServletException, IOException {
		logger.info("<<<depositAdminController-depositUpdate()>>>");
		System.out.println("타냐고 야~");
		System.out.println("DTO"+ dto);
		int updateCnt=0;
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			updateCnt=service.updateDeposit(dto);
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
	@DeleteMapping("/{yeNo}")
	public Map<String, Object> depositDelete(@PathVariable int yeNo)
			throws ServletException, IOException {
			logger.info("<<<depositAdminController-depositDelete()>>>");
			
			int deleteCnt=0;
			String resultCode="";
			String resultMsg="";
			
			Map<String, Object> map = new HashMap<String, Object>();
			try {
				deleteCnt=service.deleteDeposit(yeNo);
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
