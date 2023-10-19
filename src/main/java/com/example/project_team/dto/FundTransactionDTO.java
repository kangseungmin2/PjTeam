package com.example.project_team.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_fund_transaction")
@Data
public class FundTransactionDTO {
	
	@Id
	private long trNum;				// 거래번호
    private long fdAccount;			// 펀드 계좌번호 fk
    private String fpName; 			// 종목명 fk
    private int trCnt;				// 거래량
    private int trPrice;			// 거래금액
    private String trMarketPrice;	// 거래시가
    private String trStatus;			// 거래상태 (매수 : b, 매도 : s)
    private Date trDate;				// 거래날짜
}
