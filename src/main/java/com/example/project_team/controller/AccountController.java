package com.example.project_team.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.DepositSignDTO;
import com.example.project_team.dto.FundAccountDTO;
import com.example.project_team.dto.LoanSignDTO;
import com.example.project_team.dto.SavingsSignDTO;
import com.example.project_team.service.AccountService;


@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/allAccount")
@RestController
public class AccountController {

	@Autowired
	private AccountService service;
	
	//계좌생성
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
	
	//생성 완료된 계좌
	@GetMapping("/su/{id}")
	public AccountDTO successAccount(@PathVariable("id") String id) 
		throws ServletException, IOException {
		System.out.println("AccountController - successAccount");
		return service.successAccount(id);
	}
	
	//전체 리스트
	@GetMapping("/{id}")
	public List<AccountDTO> accountList(@PathVariable("id") String id) 
		throws ServletException, IOException{
		System.out.println("AccountController - accountList");
		return service.accountList(id);
	}
	
	//전체 리스트- 입출금
	@GetMapping("/e/{id}")
	public List<AccountDTO> accountListE(@PathVariable("id") String id) 
		throws ServletException, IOException{
		System.out.println("AccountController - accountListE");
		return service.accountListE(id);
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
	
	//관리자 결산 - 입출금
	@GetMapping("/adminAccount")
	public List<AccountDTO> openAccountData() 
		throws ServletException, IOException{
		System.out.println("AccountController - openAccountData");
		return service.openAccountData();
	}
	
	//관리자 결산 - 대출
	@GetMapping("/d/adminAccount2")
	public List<LoanSignDTO> openAccountData2() 
		throws ServletException, IOException{
		System.out.println("AccountController - openAccountData2");
		return service.openAccountData2();
	}
	
	//관리자 결산 - 펀드
	@GetMapping("/f/adminAccount3")
	public List<FundAccountDTO> openAccountData3() 
		throws ServletException, IOException{
		System.out.println("AccountController - openAccountData3");
		return service.openAccountData3();
	}
	
	//관리자 결산 - 예금
	@GetMapping("/y/adminAccount4")
	public List<DepositSignDTO> openAccountData4() 
		throws ServletException, IOException{
		System.out.println("AccountController - openAccountData4");
		return service.openAccountData4();
	}
	
	//관리자 결산 - 적금
	@GetMapping("/j/adminAccount5")
	public List<SavingsSignDTO> openAccountData5() 
		throws ServletException, IOException{
		System.out.println("AccountController - openAccountData5");
		return service.openAccountData5();
	}
}
