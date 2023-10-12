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
	private String fpName;					// 종목명
	private int fpNum;						// 종목번호
	private String closingPrice;			// 종가
	private String marketPrice;				// 시가
	private String lowPrice;				// 저가
	private String highPrice;				// 고가
	private int prepare;					// 대비
	private Float fluctuationRate;			// 등락율
	private String netAssetValue;			// 순자산가치(NAV)
	private String tradingVolume;			// 거래량
	private String transactionAmount;		// 거래대금
	private String  marketCapitalization;	// 시가총액
	private int totalNetAssets;				// 순자산총액
	private String listingsNum;				// 상장좌수
	private String bIndexName;				// 기초지수_지수명
	private String bClosingPrice;			// 기초지수_종가
	private Float bPrepare;					// 기초지수_대비
	private Float bFluctuationRate;			// 기초지수_등락률
	private Date eventDate;            		// 데이터 발생일  
    private int etc;  						//은행 수수료률
}
