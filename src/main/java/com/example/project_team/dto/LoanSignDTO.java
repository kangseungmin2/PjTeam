package com.example.project_team.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_loan_sign")
@Data
public class LoanSignDTO {

	@Id
	private int loanNum;			// 대출번호 PK
    private String id;				// 회원아이디 FK
    private int num;				// 상품번호 FK
    private String loanProductName;	// 상품명
    private String loanAccountNum;	// 계좌번호 (대출계좌|승인되면 발급)
    private char accountType;		// 계좌타입
    private long accountNum;		// 계좌번호 (입출금계좌) FK
    private int accountPW;			// 계좌비밀번호(입출금계좌 비번)
    private String loanState;		// 대출상태(신청/반려/정상/해지)
    private int loanAmount;			// 대출금액(원금)
    private int paymentDay;			// 대출납입일(이자 나가는 날)
    private Date loanExecution;		// 대출실행일(sysdate)
    private Date loanExpiration;	// 대출만기일
    private String repayment;		// 상환방법
    private int interestRate;		// 금리(년)
    private int loanPeriod;			// 기간(년)
    private int loanBalance;		// 대출잔액(원)
    private int interestBalance;	// 이자잔액(원)
    private int loanRepayment;		// 상환액(원)
    private Date loanTermination;	// 대출해지일
    private int earlyRepayment;		// 중도상환수수료금액
}
