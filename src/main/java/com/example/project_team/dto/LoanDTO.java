package com.example.project_team.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_loan_product")
@Data
public class LoanDTO {

	@Id
	private int num;
	private String loanProductName;
	private Date loanProductRegistrationDate;
	private int interestRate;
	private String content;
	private int minMoney;
	private int maxMoney;
	private int minPeriod;
	private int maxPeriod;
	private String repayment;
	private int commission;
}
