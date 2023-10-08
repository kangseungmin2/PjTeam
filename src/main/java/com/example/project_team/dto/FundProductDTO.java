package com.example.project_team.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_fund_product")
@Data
public class FundProductDTO {
	
	@Id
	private String fpName;				// 종목명
	private int fpNum;					// 종목번호
	private int closingPrice;			// 종가
	private int marketPrice;			// 시가
	private int lowPrice;				// 저가
	private int highPrice;				// 고가
	private int prepare;				// 대비
	private int fluctuationRate;		// 등락율
	private int netAssetValue;			// 순자산가치(NAV)
	private int tradingVolume;			// 거래량
	private int transactionAmount;		// 거래대금
	private Long  marketCapitalization;	// 시가총액
	private int totalNetAssets;			// 순자산총액
	private int listingsNum;			// 상장좌수
	private String bIndexName;			// 기초지수_지수명
	private int bClosingPrice;			// 기초지수_종가
	private int bPrepare;				// 기초지수_대비
	private int bFluctuationRate;		// 기초지수_등락률
	private Date eventDate;             // 데이터 발생일  
    private int etc;  					//은행 수수료률
}
