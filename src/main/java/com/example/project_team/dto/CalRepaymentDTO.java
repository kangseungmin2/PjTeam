package com.example.project_team.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_loan_repayment")
@Data
public class CalRepaymentDTO {

	@Id
	private int repaymentNum;		// 상환번호
	private String id;				// 회원아이디 FK
    private int num;				// 상품번호 FK
    private String repayment;		// 상환방법
    private String paymentRound;	// 납입회차
    private int loanAmount;			// 대출원금
    private int interestRate;		// 이자율
    private int interest;			// 이자
    private int paymentAmount;		// 납입원금
    private int loanPeriod;			// 대출기간
    private int repaymentMonth;		// 월상환금(납입원금+이자)
    private int paymentAmountTotal;	// 납입원금누계(납입원금누계+납입원금)
    private int amountBalance;		// 잔금(잔금-납입원금)
    private int totalInterest;		// 총 대출이자
    private int totalRepayment;		// 총 상환금  
    
}
