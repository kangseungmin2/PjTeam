package com.example.project_team.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_limit")
@Data
public class LimitDTO {

	@Id
	private int limitNum; 		// 한도번호 PRIMARY KEY
	private String id; 			// 회원아이디 FK
	private String name; 		// 회원명
	private long accountNum; 	// 계좌번호
	private int accountPW; 		// 계좌비밀번호
	private int accountLimit;	// 일일이체한도
	private int wantLimit;		// 희망한도
	private Date limitDate; 	// 한도변경일
	
}
