package com.example.project_team.dto;

import java.util.Date;

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
	private int loanNum;			// 가입번호
	private String id;				// 회원아이디 FK
    private int num;				// 상품번호 FK
    private String repayment;		// 상환방법
    private int paymentRound;		// 납입회차(대출기간*12 => 총납입회차)
    private int loanAmount;			// 대출원금
    private double interestRate;	// 이자율
    private double interest;		// 이자
    private double repaymentAmount;	// 납입원금
    private int loanPeriod;			// 대출기간
    private double repaymentMonth;	// 월상환금(납입원금+이자)
    private int amountBalance;		// 잔금(잔금-납입원금)
    private Date payDate;
    private long accountNum;
}

