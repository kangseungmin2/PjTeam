package com.example.project_team.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="TEAM_DEPOSIT_SIGN")
@Data
public class DepositSignDTO {

	@Id
	private int yeSignNo;			// 예금번호 PK
    private String id;				// 회원아이디 FK
    private int yeNo;				// 상품번호 FK
    private String yeName;
    private String yeState;
    private long depositAccountNum;	// 계좌번호 (예금계좌|승인되면 발급)
    private char accountType;		// 계좌타입
    private long accountNum;		// 계좌번호 (입출금계좌) FK
    private int accountPW;			// 계좌비밀번호(입출금계좌 비번)
    private int yeAmount;			// 예금금액(원금)
    private Date yeJoinDate;		// 예금실행일(sysdate)
    private Date yeEndDate;			// 예금만기일
    private int rate;			// 기간(년)
    private int interestRate;		// 금리(년)
}
