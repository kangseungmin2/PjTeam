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
import com.example.project_team.dto.AutoSignDTO;
import com.example.project_team.dto.SavingsDTO;
import com.example.project_team.dto.SavingsSignDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.exceptionHandler.ErrorResponse;
import com.example.project_team.service.savingsSignMemberServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/savingsSign")
public class savingsSignMemberController {

	private static final Logger logger = LoggerFactory.getLogger(savingsSignMemberController.class);

	@Autowired
	private savingsSignMemberServiceImpl service;

	// 1건 select
	@GetMapping("/{juckNo}")
	public SavingsDTO fetchSavingsByNum(@PathVariable int juckNo)
			throws ServletException, IOException {
		logger.info("<<< savingsSignMemberController - fetchSavingsByNum() >>>");
		return service.selectSavings(juckNo);
	}

	// 계좌조회List
	@GetMapping("/e/{id}")
	public List<AccountDTO> SavingsList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< savingsSignMemberController - SavingsList() >>>");
		return service.listAll(id);
	}

	// 계좌와 비밀번호 체크
	@GetMapping("/f/{accountNum}/{id}")
	public int accountPwCheck (@PathVariable long accountNum, @PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< savingsSignMemberController - accountPwCheck() >>>");
		return service.pwCheck(accountNum, id);
	}

	// sign테이블에 insert
	@PostMapping
	public Map<String, Object> signInsert(@RequestBody SavingsSignDTO dto)
			throws ServletException, IOException {
		logger.info("<<< savingsSignMemberController - signInsert() >>>");
		System.out.println("savingsSignMemberController - signInsert");
		System.out.println("dto"+dto);
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
	// 적금 신청 List
	@GetMapping("/savingsSignList/{id}")
	public List<SavingsSignDTO> savingsSignList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< savingsSignMemberController - savingsSignList() >>>");
		return service.savingsSignList(id);
	}
	// 계좌조회List
	@GetMapping("/signList/{juckSignNo}")
	public SavingsSignDTO signList(@PathVariable int juckSignNo)
			throws ServletException, IOException {
		logger.info("<<< savingsSignMemberController - signList() >>>");
		return service.signList(juckSignNo);
	}


	// 해지 
	@PostMapping("/payRequest")
	public ResponseEntity<ErrorResponse> cancelSavings(@RequestBody SavingsSignDTO dto)
			throws ServletException, IOException {
		logger.info("<<< savingsSignMemberController - cancelSavings() >>>");
		try {
			service.cancelSavings(dto);// Service 클래스 호출
			return ResponseEntity.ok(new ErrorResponse(true, "해지 완 료!."));
		} catch (CustomException ex) {
			// Service에서 발생한 예외 처리
			return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
			//return new ResponseEntity<FundErrorResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// 납입하기-처리
	@PutMapping("/payment")
	public ResponseEntity<ErrorResponse> payment(@RequestBody SavingsSignDTO dto)
			throws ServletException, IOException {
		logger.info("<<< savingsSignMemberController - payment() >>>");
		System.out.println("dto뜨나"+dto);
		try {
			service.updateRepayment(dto);// Service 클래스 호출
			return ResponseEntity.ok(new ErrorResponse(true, "납부가 성공적으로 완료되었습니다."));
		} catch (CustomException ex) {
			// Service에서 발생한 예외 처리
			return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
		}
	}

	// 납입하기-처리
//	@PutMapping("/payment")
//	public ResponseEntity<ErrorResponse> autoPayment(@RequestBody AutoSignDTO dto)
//			throws ServletException, IOException {
//		logger.info("<<< savingsSignMemberController - payment() >>>");
//		System.out.println("dto뜨나"+dto);
//		try {
//			service.autoRepayment(dto);// Service 클래스 호출
//			return ResponseEntity.ok(new ErrorResponse(true, "납부가 성공적으로 완료되었습니다."));
//		} catch (CustomException ex) {
//			// Service에서 발생한 예외 처리
//			return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
//		}
//	}


}
