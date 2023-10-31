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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.LimitDTO;
import com.example.project_team.dto.LoanDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.exceptionHandler.ErrorResponse;
import com.example.project_team.service.TransferServiceImpl;

@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/trans")
@RestController
public class TransferController {

	@Autowired
	private TransferServiceImpl service;
	
	private static final Logger logger = LoggerFactory.getLogger(TransferController.class);
	
	// List => 한건/다건 이체목록
	@GetMapping
	public List<TransferDTO> transferList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - transferList>>>");
		
		return service.transferList(req, model); 
	}
	
	// TransDetail => 한건이체 상세
	@GetMapping("/transDetail/{transferNum}")
	public TransferDTO transferDetail(@PathVariable int transferNum) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - transDetail>>>");
		
		return service.transferDetail(transferNum); 
	}
	
	// trAccountList => 한건이체전에 이체 계좌 선택
	@GetMapping("/transAccount/{id}")
	public List<AccountDTO> transAccount(@PathVariable String id) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - transAccount>>>");
		
		return service.transAccount(id);
	}
	
	// OneTransfer => 한건이체
	@PostMapping("/oneTransfer")
   public ResponseEntity<ErrorResponse> oneTransfer(@RequestBody TransferDTO dto)
         throws ServletException, IOException {
	   logger.info("<<<TransferController - oneTransfer>>>");
     try {
           service.oneTransfer(dto);// Service 클래스 호출
            return ResponseEntity.ok(new ErrorResponse(true, "거래가 성공적으로 완료되었습니다."));
        } catch (CustomException ex) {
            // Service에서 발생한 예외 처리
            return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
            //return new ResponseEntity<FundErrorResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
     
   }
	
	// limitAccount => 한도변경요청 전에 이체 계좌 선택 => 위에 이체 전 계좌선택과 동일
	@GetMapping("/limitAccount/{id}")
	public List<AccountDTO> limitAccount(@PathVariable String id) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - limitAccount>>>");
		
		return service.limitAccount(id);
		
	}
		
	// changeLimit => 한건이체
	@PostMapping("/changeLimit")
   public ResponseEntity<ErrorResponse> changeLimit(@RequestBody LimitDTO dto)
         throws ServletException, IOException {
	   logger.info("<<<TransferController - changeLimit>>>");
     try {
           service.changeLimit(dto);// Service 클래스 호출
            return ResponseEntity.ok(new ErrorResponse(true, "한도 변경 신청이 완료되었습니다."));
        } catch (CustomException ex) {
            // Service에서 발생한 예외 처리
            return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
        }
     
   }
		
	// transferLimit => (관리자)고객 한도 변경 요청 승인/반려 리스트
	@GetMapping("/transferLimit")
	public List<LimitDTO> transferLimit(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - transferLimit>>>");
	
		return service.transferLimit(req, model);
	}
	
	// afterLimit => (관리자)고객 한도 변경 요청 심사완료 목록
	@GetMapping("/afterLimit{limitNum}")
	public List<LimitDTO> afterLimit(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - afterLimit>>>");
	
		return service.afterLimit(req, model);
	}
		
	// updateLimit
	@PutMapping("/updateLimit/{limitNum}")
	public void updateLimit(@PathVariable int limitNum, @RequestBody AccountDTO dto) 
			throws ServletException, IOException {
	    logger.info("<<< TransferController - updateLimit() >>>");

    	 service.updateLimit(limitNum, dto);
	}

	// deleteLimit
	@PutMapping("/deleteLimit/{limitNum}")
	public Map<String, Object> deleteLimit(@PathVariable int limitNum)
		throws ServletException, IOException {
		logger.info("<<< TransferController - deleteLimit() >>>");
		
		int deleteCnt=0;
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			deleteCnt=service.deleteLimit(limitNum);
			if(deleteCnt==1) {
				resultCode="333";
				resultMsg="deleteLimit 성공";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="444";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		
		System.out.println("[deleteLimit 성공!]");
		return map;
	}
	
	// adminTransfer
	@GetMapping("/adminTransfer/")
	public List<TransferDTO> adminTransfer(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - adminTransfer>>>");
		
		return service.adminTransfer(req, model); 
	}

}
