package com.example.project_team.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
@Entity
@Table(name="TEAM_SAVINGS_PRODUCT")
@Data
public class SavingsDTO {
	@Id
	private int juckNo;                   
	private String juckName;                   
	private Date juckRegistrationDate;           
	private int interestRate;               
	private String juckSummary;                             
	private int juckMinPrice;             
	private int juckMaxPrice;                      
	private int juckMinDate;                         
	private int juckMaxDate;                            
	
}
