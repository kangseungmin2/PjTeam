package com.example.project_team.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.CalRepaymentDTO;
import com.example.project_team.service.CalRepaymentService;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/calRepayment")
public class CalRepaymentController {

	private static final Logger logger = LoggerFactory.getLogger(CalRepaymentController.class);

	@Autowired
	private CalRepaymentService service;
	
	// insert
	@PostMapping
	public Map<String, Object> RepaymentInsert(@RequestBody CalRepaymentDTO dto)
		throws ServletException, IOException {
		logger.info("<<< CalRepaymentController - RepaymentInsert() >>>");
		
		int insertCnt=0;
		String resultCode="";
		String resultMsg="";
		int loanAmount = dto.getLoanAmount();
		
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("payment"+dto.getRepayment());
		try {
            if (dto.getRepayment().equals("원리금균등상환")) {
                // Calculate 원리금균등상환
            	System.out.println("1");
            	System.out.println(dto.getInterestRate());
                int totalRepayment = calculateEqualPrincipalAndInterest(dto.getLoanAmount(), dto.getInterestRate(), dto.getLoanPeriod());
                dto.setTotalRepayment(totalRepayment);
                dto.setTotalInterest(totalRepayment-loanAmount);
            } else if (dto.getRepayment().equals("원금균등상환")) {
            	System.out.println("2원금균등상환");
                // Calculate 원금균등상환
                int totalRepayment = calculateEqualPrincipal(dto.getLoanAmount(), dto.getInterestRate(), dto.getLoanPeriod());
                dto.setTotalRepayment(totalRepayment);
                dto.setTotalInterest(totalRepayment-loanAmount);
            } else if (dto.getRepayment().equals("만기일시상환")) {
            	System.out.println("3만기일시상환");
                // Calculate 만기일시상환
                int totalRepayment = calculateLumpSumRepayment(dto.getLoanAmount(), dto.getInterestRate(), dto.getLoanPeriod());
                dto.setTotalRepayment(totalRepayment);
                dto.setTotalInterest(totalRepayment-loanAmount);
            } else {
                resultCode = "400";
                resultMsg = "Invalid repayment method";
            }

            insertCnt = service.insertRepayment(dto);
            if (insertCnt == 1) {
                resultCode = "200";
                resultMsg = "Repayment calculation and insert success";
            }
        } catch (Exception e) {
            resultCode = "500";
            resultMsg = e.getMessage();
        }

        map.put("resultCode", resultCode);
        map.put("resultMsg", resultMsg);
        return map;
    }

    // 원리금균등상환
    private int calculateEqualPrincipalAndInterest(int loanAmount, int interestRate, int loanPeriod) {
    	 // 연간 이자율을 월간 이자율로 변환
    	System.out.println("loanAmount"+loanAmount);
    	System.out.println("interestRate"+interestRate);
    	System.out.println("loanPeriod"+loanPeriod);
    	
    	double monthlyInterestRate = (double)interestRate / 12 / 100;
    	
        System.out.println("monthlyInterestRate"+monthlyInterestRate);
        // 총 납입 회수 계산(대출기간(년)*12)
        int totalPaymentRound = loanPeriod * 12;
        System.out.println("total"+totalPaymentRound);
        // 월 납부액 계산
        double repaymentMonth = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPaymentRound));
        // 총 상환금액 계산(월상환금*총납입회수)
        return  (int)repaymentMonth * totalPaymentRound;
    }

    // 원금균등상환
    private int calculateEqualPrincipal(int loanAmount, int interestRate, int loanPeriod) {
    	// 총 납입 회수 계산(대출기간(년)*12)
        int totalPaymentRound = loanPeriod * 12;
        
        // 월 상환원금 계산
        double repaymentMonth = (double)loanAmount / totalPaymentRound;
        
        // 총 상환금액 계산
        double totalRepayment = 0;
        for (int i = 1; i <= totalPaymentRound; i++) {
            // 해당 월의 이자 계산
            double interestPayment = ((double)loanAmount - (i - 1) * repaymentMonth) * interestRate / 12 / 100;
            totalRepayment += repaymentMonth + interestPayment;
        }
        
        return (int)totalRepayment;
    }

    // 만기일시상환
    private int calculateLumpSumRepayment(int loanAmount, int interestRate, int loanPeriod) {
    	 // 총 상환금액 계산
        double totalRepayment = (double)loanAmount * (1 + (interestRate / 100));
        return (int)totalRepayment;
    
	}
	
	// 1건 select
		@GetMapping("/{repaymentNum}")
		public CalRepaymentDTO fetchRepaymentByNum(@PathVariable int repaymentNum)
			throws ServletException, IOException {
			logger.info("<<< CalRepaymentController - fetchRepaymentByNum() >>>");
			return service.selectRepayment(repaymentNum);
		}
	
}
