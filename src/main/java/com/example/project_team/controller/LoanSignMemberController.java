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
import com.example.project_team.dto.CalRepaymentDTO;
import com.example.project_team.dto.FundTransactionDTO;
import com.example.project_team.dto.LoanDTO;
import com.example.project_team.dto.LoanSignDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.exceptionHandler.ErrorResponse;
import com.example.project_team.service.LoanSignAdminService;
import com.example.project_team.service.LoanSignAdminServiceImpl;
import com.example.project_team.service.LoanSignMemberService;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/loanSign")
public class LoanSignMemberController {

	private static final Logger logger = LoggerFactory.getLogger(LoanSignMemberController.class);

	@Autowired
	private LoanSignMemberService service;
	
	// 1건 select
	@GetMapping("/{num}")
	public LoanDTO fetchLoanByNum(@PathVariable int num)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - fetchLoanByNum() >>>");
		return service.selectLoan(num);
	}

	// 계좌조회List
	@GetMapping("/e/{id}")
	public List<AccountDTO> loanList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - LoanList() >>>");
		return service.listAll(id);
	}

	// 계좌와 비밀번호 체크
	@GetMapping("/f/{accountNum}/{id}")
	public int accountPwCheck (@PathVariable long accountNum, @PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - accountPwCheck() >>>");
		return service.pwCheck(accountNum, id);
	}

	// sign테이블에 insert
	@PostMapping
	public Map<String, Object> signInsert(@RequestBody LoanSignDTO dto)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - signInsert() >>>");

		int insertCnt=0;
		String resultCode="";
		String resultMsg="";

		Map<String, Object> map = new HashMap<String, Object>();
		try {
			insertCnt=service.insertSign(dto);
			if(insertCnt==1) {
				resultCode="333";
				resultMsg="signInsert success♥️";
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

	// 대출 신청 List
	@GetMapping("/loanSignList/{id}")
	public List<LoanSignDTO> loanSignList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - loanSignList() >>>");
		return service.loanSignList(id);
	}
	// 본인인증
	@GetMapping("/checkIdentity/{id}")
	public long checkIdentity(@PathVariable String id)
		throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - checkIdentity() >>>");
		return service.checkIdentity(id);
	}

	// 대출 계산 출력
	@GetMapping("/loanCal/{loanNum}")
	public List<Map<String, Object>> calList(@PathVariable int loanNum)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - calList() >>>");
		System.out.println("대출 계산 리스트 출력타냐");
		LoanSignAdminServiceImpl admin = new LoanSignAdminServiceImpl();
		return admin.repayment(loanNum);
	}

	// 이자조회 List 출력
	@GetMapping("/loanList/{id}")
	public List<LoanSignDTO> signList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - signList() >>>");
		return service.signList(id);
	}

	@GetMapping("/repayment/{id}")
	public List<CalRepaymentDTO> repaymentList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - RepaymentList() >>>");
		System.out.println("컨트롤러타나");
		return service.repaymentList(id);
	}

	// 납입하기-signList
	@GetMapping("/paySignList/{id}/{loanNum}")
	public LoanSignDTO paySignList(@PathVariable String id,@PathVariable int loanNum)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - paySignList() >>>");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id",id);
		map.put("loanNum",loanNum);

		return service.paySignList(map);
	}

	// 납입하기-repaymentList
	@GetMapping("/payRepaymentList/{id}/{loanNum}")
	public CalRepaymentDTO payRepaymentList(@PathVariable String id,@PathVariable int loanNum)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - payRepaymentList() >>>");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id",id);
		map.put("loanNum",loanNum);
		return service.payRepaymentList(map);
	}

	// 납입하기-처리
	@PutMapping("/payment")
	public ResponseEntity<ErrorResponse> payment(@RequestBody CalRepaymentDTO dto)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - payment() >>>");
		System.out.println("dto뜨나"+dto);
		try {
			service.updateRepayment(dto);// Service 클래스 호출
			return ResponseEntity.ok(new ErrorResponse(true, "납부가 성공적으로 완료되었습니다."));
		} catch (CustomException ex) {
			// Service에서 발생한 예외 처리
			return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
		}
	}
	
	// 대출해지(상환)
	@PutMapping("/endPayment")
	public ResponseEntity<ErrorResponse> endPayment(@RequestBody LoanSignDTO dto)
			throws ServletException, IOException {
		logger.info("<<< LoanSignMemberContorller - payment() >>>");
		System.out.println("dto뜨나"+dto);
		try {
			service.endRepayment(dto);// Service 클래스 호출
			return ResponseEntity.ok(new ErrorResponse(true, "납부가 성공적으로 완료되었습니다."));
		} catch (CustomException ex) {
			// Service에서 발생한 예외 처리
			return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
		}
	}
}
