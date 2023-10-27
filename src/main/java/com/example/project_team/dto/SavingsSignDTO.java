package com.example.project_team.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="TEAM_SAVINGS_SIGN")
@Data
public class SavingsSignDTO {

	@Id
	private int juckSignNo;			// 적금번호 PK
    private String id;				// 회원아이디 FK
    private int juckNo;				// 상품번호 FK
    private String juckName;
    private String juckState;
    private int savingsAccountNum;	// 계좌번호 (적금계좌|승인되면 발급)
    private char accountType;		// 계좌타입
    private long accountNum;		// 계좌번호 (입출금계좌) FK
    private int accountPW;			// 계좌비밀번호(입출금계좌 비번)
    private int juckAmount;			// 적금금액(원금)
    private String juckMethod;		// 적금방법
    private Date juckJoinDate;		// 적금실행일(sysdate)
    private Date juckEndDate;		// 적금만기일
    private Date juckAutoDate;		// 자동납부일(sysdate)
    private int rate;				// 기간(년)
    private int interestRate;		// 금리(년)
}
