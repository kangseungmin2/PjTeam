package com.example.project_team.controller;

import java.io.IOException;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.DepositDTO;
import com.example.project_team.dto.DepositSignDTO;
import com.example.project_team.dto.FundTransactionDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.exceptionHandler.ErrorResponse;
import com.example.project_team.service.depositSignMemberServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/depositSign")
public class depositSignMemberController {

	private static final Logger logger = LoggerFactory.getLogger(depositSignMemberController.class);
	
	@Autowired
	private depositSignMemberServiceImpl service;
	
	// 1건 select
	@GetMapping("/{yeNo}")
	public DepositDTO fetchDepositByNum(@PathVariable int yeNo)
		throws ServletException, IOException {
		logger.info("<<< depositSignMemberController - fetchDepositByNum() >>>");
		return service.selectDeposit(yeNo);
	}
	
	// 계좌조회List
	@GetMapping("/e/{id}")
	public List<AccountDTO> DepositList(@PathVariable String id)
		throws ServletException, IOException {
		logger.info("<<< depositSignMemberController - DepositList() >>>");
		return service.listAll(id);
	}
	
	// 계좌와 비밀번호 체크
	@GetMapping("/f/{accountNum}/{id}")
	public int accountPwCheck (@PathVariable long accountNum, @PathVariable String id)
		throws ServletException, IOException {
		logger.info("<<< depositSignMemberController - accountPwCheck() >>>");
		return service.pwCheck(accountNum, id);
	}
	
	// sign테이블에 insert
	@PostMapping
	public Map<String, Object> signInsert(@RequestBody DepositSignDTO dto)
		throws ServletException, IOException {
		logger.info("<<< depositSignMemberController - signInsert() >>>");
		
		int insertCnt=0;
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			insertCnt=service.insertSign(dto);
			if(insertCnt==1) {
				resultCode="333";
				resultMsg="signInsert success";
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
	
	// 예금 신청 List
	   @GetMapping("/depositSignList/{id}")
	   public List<DepositSignDTO> depositSignList(@PathVariable String id)
	         throws ServletException, IOException {
	      logger.info("<<< depositSignMemberController - depositSignList() >>>");
	      return service.depositSignList(id);
	   }
	   
	   // 계좌조회List
		@GetMapping("/signList/{yeSignNo}")
		public DepositSignDTO signList(@PathVariable int yeSignNo)
			throws ServletException, IOException {
			logger.info("<<< depositSignMemberController - signList() >>>");
			return service.signList(yeSignNo);
		}
	   
	   
	// 해지 
		@PostMapping("/payRequest")
		public ResponseEntity<ErrorResponse> cancelDeposit(@RequestBody DepositSignDTO dto)
				throws ServletException, IOException {
			logger.info("<<< depositSignMemberController - cancelDeposit() >>>");
		  try {
			  	service.cancelDeposit(dto);// Service 클래스 호출
	            return ResponseEntity.ok(new ErrorResponse(true, "해지 완 료!."));
	        } catch (CustomException ex) {
	            // Service에서 발생한 예외 처리
	            return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
	            //return new ResponseEntity<FundErrorResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
		}
		
	   
}
