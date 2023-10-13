package com.example.project_team.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.service.AccountService;


@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/allAccount")
@RestController
public class AccountController {

	@Autowired
	private AccountService service;
	
	@PostMapping
	public Map<String,Object> accountOpening(@RequestBody AccountDTO dto) {
		System.out.println("<<<AccountController - accountOpening>>>");
		int insertCnt = 0;
		String resultCode="";
		String resultMsg="";
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			System.out.println("dto:"+dto);
			insertCnt = service.insertAccount(dto);
			if(insertCnt == 1) {
				resultCode = "200";
				resultMsg ="성공";
			}
		}catch(Exception e) {
			resultCode= "400";
			resultMsg ="실패";
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		return map;
	}
	
	@GetMapping
	public List<AccountDTO> accountList(HttpServletRequest req, Model model) 
		throws ServletException, IOException{
		System.out.println("AccountController - accountList");
		return service.accountList(req, model);
	}
}
