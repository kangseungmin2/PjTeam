package com.example.project_team.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_fund_income")
@Data
public class FundIncomeDTO {
	
	@Id
	private int incomeNum;   		// 거래번호
	private String fpName;  		// 종목명 fk
	private long income;			// 수익
}