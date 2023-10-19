package com.example.project_team.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
@Entity
@Table(name="TEAM_DEPOSIT_PRODUCT")
@Data
public class DepositDTO {
	
	@Id
	private int yeNo;                       
    private String yeName;                 
    private Date yeRegistrationDate;           
    private int interestRate;             
    private String yeSummary;            
    private int yeMinPrice;                 
    private int yeMaxPrice;            
    private int yeMinDate;            
    private int yeMaxDate;             

}
