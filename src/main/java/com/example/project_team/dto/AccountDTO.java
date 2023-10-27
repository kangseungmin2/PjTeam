package com.example.project_team.dto;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="team_account")
@Builder
@Data
public class AccountDTO {
	
	@Id
	private long accountNum;         //계좌번호 pk
	private String id;				//회원id
	private int accountPW;          //계좌 비밀번호
	private long balance;            //잔액
	private char accountType;       //계좌종류(디폴트 입출금:e, 예금: y , 적금: j, 대출: d, 펀드: p)
	private char accountState;      //계좌상태(정상 : j, 휴먼 : h, 해지 : c, 정지 : s)
	private int accountLimit;       //일일한도
	private Timestamp deleteDate;   //해지일
	private Timestamp sleepDate;    //휴면일
    private Timestamp madeDate; 	//개설일
}
