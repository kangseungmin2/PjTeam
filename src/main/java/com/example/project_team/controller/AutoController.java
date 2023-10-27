package com.example.project_team.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.AutoDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.exceptionHandler.ErrorResponse;
import com.example.project_team.service.AutoServiceImpl;
import com.example.project_team.service.TransferServiceImpl;

@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/auto")
@RestController
public class AutoController {

	@Autowired
	private AutoServiceImpl service;
	
	private static final Logger logger = LoggerFactory.getLogger(AutoController.class);
	
	// List => 자동이체 목록
	@GetMapping
	public List<AutoDTO> autoList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		logger.info("<<<AutoController - autoList>>>");
		
		return service.autoList(req, model); 
	}
	
	// AutoDetail => 자동이체 상세
	@GetMapping("/autoDetail/{autoNum}")
	public AutoDTO autoDetail(@PathVariable int autoNum) 
			throws ServletException, IOException {
		logger.info("<<<AutoController - autoDetail>>>");
		
		return service.autoDetail(autoNum); 
	}
	
	// autoAccount => 자동이체전에 이체 계좌 선택
	@GetMapping("/autoAccount/{id}")
	public List<AccountDTO> autoAccount(@PathVariable String id) 
			throws ServletException, IOException {
		logger.info("<<<AutoController - autoAccount>>>");
		
		return service.autoAccount(id);
	}
	
	// autoWithdrawal => 자동이체 연결
	@PostMapping("/autoWithdrawal")
   public ResponseEntity<ErrorResponse> autoWithdrawal(@RequestBody AutoDTO dto)
         throws ServletException, IOException {
	   logger.info("<<<AutoController - autoWithdrawal>>>");
     try {
           service.autoWithdrawal(dto);// Service 클래스 호출
            return ResponseEntity.ok(new ErrorResponse(true, "거래가 성공적으로 완료되었습니다."));
        } catch (CustomException ex) {
            // Service에서 발생한 예외 처리
            return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
            //return new ResponseEntity<FundErrorResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
     
   }
		
	// changeAuto => 자동이체 변경/해지 메인
	@GetMapping("/changeAuto/{autoNum}")
	public AutoDTO changeAuto(@PathVariable int autoNum) 
			throws ServletException, IOException {
		logger.info("<<<AutoController - changeAuto>>>");
		
		return service.changeAuto(autoNum); 
	}
	
	// alterAutoDate
	@PostMapping("/alterAutoDate/{autoNum}")
	public AutoDTO alterAutoDate(@PathVariable int autoNum) 
			throws ServletException, IOException {
		logger.info("<<<AutoController - alterAutoDate>>>");
		
		return service.alterAutoDate(autoNum); 
	}
	
	
	
	
	
	
}
