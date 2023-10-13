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
	private int jNo;                   
	private String jName;                   
	private Date jRegistrationDate;           
	private int interestRate;               
	private String jSummary;             
	private String jType;                    
	private int jMinPrice;             
	private int jMaxPrice;                      
	private int jMinDate;                         
	private int jMaxDate;                            

}
