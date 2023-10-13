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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.service.AccountService;

@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/openAccount")
@RestController
public class AccountController {

	@Autowired
	private AccountService service;
	
	//계좌추가
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
	
	//전체 리스트
	@GetMapping
	public List<AccountDTO> accountList(HttpServletRequest req, Model model) 
		throws ServletException, IOException{
		System.out.println("AccountController - accountList");
		return service.accountList(req, model);
	}
	
	//전체 리스트
	@GetMapping("/y")
	public List<AccountDTO> accountList2(HttpServletRequest req, Model model) 
		throws ServletException, IOException{
		System.out.println("AccountController - accountList");
		return service.accountList2(req, model);
	}
	
	//비밀번호 변경
	@PutMapping("/{accountNum}")
	public Map<String,Object> passwordModify(@PathVariable("accountNum") long accountNum, @RequestBody AccountDTO dto)
			throws ServletException, IOException {
		System.out.println("AccountController - passwordModify");
		String resultCode="";
		String resultMsg="";
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			int insertCnt = service.passwordModify(dto);
			if(insertCnt ==1) {
				//console.log('Edit 성공 : ===== ', res.data);
				resultCode ="200";
				resultMsg="sampleUpdate Success@";
			}
		}catch(Exception e) {
			resultCode ="400";
			resultMsg=e.getMessage();
			e.printStackTrace();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		System.out.println("[ passwordModify 성공 ~");
		return map;
	}
	
	//1 select
	@GetMapping("/{accountNum}")
	public AccountDTO fetchAccountByNum(@PathVariable("accountNum") long accountNum)
			throws ServletException, IOException {
		return service.fetchAccountByNum(accountNum);
	}
	
	//계좌해지
	@PutMapping("/deleteAccount/{accountNum}")
	public int deleteAccount(@PathVariable("accountNum") long accountNum)
			throws ServletException, IOException {
		System.out.println("AccountController - deleteAccount");
		return service.deleteAccount(accountNum);
	}
	
	
}
