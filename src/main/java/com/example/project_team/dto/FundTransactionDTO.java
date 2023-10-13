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
	private long tNum;				// 거래번호
    private long fAccount;			// 펀드 계좌번호 fk
    private String fpName; 			// 종목명 fk
    private int tCnt;				// 거래량
    private String tPrice;			// 거래금액
    private String tMarketPrice;		// 거래시가
    private String tStatus;			// 거래상태 (매수 : b, 매도 : s)
    private Date tDate;				// 거래날짜
}
