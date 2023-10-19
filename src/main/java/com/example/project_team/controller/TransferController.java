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
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.FundCustomException;
import com.example.project_team.exceptionHandler.FundErrorResponse;
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
	@GetMapping("/{transferNum}")
	public TransferDTO transferDetail(@PathVariable("transferNum") int transferNum) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - transDetail>>>");
		
		return service.transferDetail(transferNum); 
	}
	
	// trAccountList => 한건이체전에 이체 계좌 선택
	@GetMapping("/trAccountList/{id}")
	public List<AccountDTO> trAccountList(@PathVariable String id) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - trAccountList>>>");
		
		return service.trAccountList(id);
		
	}
	
	// OneTransfer => 한건이체
	@PostMapping("/oneTransfer")
   public ResponseEntity<FundErrorResponse> oneTransfer(@RequestBody TransferDTO dto)
         throws ServletException, IOException {
	   logger.info("<<<TransferController - oneTransfer>>>");
     try {
           service.oneTransfer(dto);// Service 클래스 호출
            return ResponseEntity.ok(new FundErrorResponse(true, "거래가 성공적으로 완료되었습니다."));
        } catch (FundCustomException ex) {
            // Service에서 발생한 예외 처리
            return ResponseEntity.ok(new FundErrorResponse(false, ex.getMessage()));
            //return new ResponseEntity<FundErrorResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
   }
	
	// TransDetail => 한건이체 상세
//	@GetMapping("/{transferNum}")
//	public TransferDTO transferDetail(@PathVariable("transferNum") int transferNum) 
//			throws ServletException, IOException {
//		logger.info("<<<TransferController - transDetail>>>");
//		
//		return service.transferDetail(transferNum); 
//	}
		
	// lmAccountList => 한도변경요청 전에 이체 계좌 선택
	@GetMapping("/lmAccountList/{id}")
	public List<AccountDTO> lmAccountList(@PathVariable String id) 
			throws ServletException, IOException {
		logger.info("<<<TransferController - lmAccountList>>>");
		
		return service.lmAccountList(id);
		
	}
		
	//changeLimit => 한도변경(하향, 상향)
	@PostMapping("/changeLimit")
	public AccountDTO changeLimit(@PathVariable("accountNum") int accountNum)
			throws ServletException, IOException {
		logger.info("<<<TransferController - changeLimit>>>");
	
		return service.changeLimit(accountNum);
	}
	
}
