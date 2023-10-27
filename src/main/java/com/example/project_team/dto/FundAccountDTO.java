package com.example.project_team.dto;


import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_fund_account")
@Data
public class FundAccountDTO {
	
	@Id
	private long fdAccount;   				// 펀드 계좌번호
    private String id;						// 아이디 FK
    private int fdPw;						// 펀드계좌 비밀번호
    private long accountNum;				// 입출금 계좌번호
    private int balance;					// 잔액
    private Date madeDate;					// 개설일
    private Date deleteDate;				// 해지일
    private Date sleepDate;					// 휴먼일
    private String show;					// 계좌상태
    private String agree;					// 약관동의 여부
}

