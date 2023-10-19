package com.example.project_team.dto;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_transfer")
@Data
public class TransferDTO {

	@Id
	private int transferNum; 	// 이체거래번호 PRIMARY KEY
	private String id; 			// 회원아이디 FK
	private String name; 		// 고객명
	private String transType;   // 이체 타입
	private long accountNum; 	// 출금계좌번호
	private int balance;        // 잔액
	private int accountLimit;	// 일일이체한도
	private int accountPW; 		// 계좌비밀번호
	private String trName; 		// 수취인명
	private String trbank; 		// 입금은행
	private long trAccountNum; 	// 입금계좌번호
	private int trAmount; 		// 이체금액
	private Date trDate; 		// 이체일
	
}
