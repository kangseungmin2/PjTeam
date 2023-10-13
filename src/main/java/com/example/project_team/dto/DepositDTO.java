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
	private int yNo;                       
    private String pryName;                 
    private Date yRegistrationDate;           
    private int interestRate;             
    private String ySummary;            
    private int yMinPrice;                 
    private int yMaxPrice;            
    private int yMinDate;            
    private int yMaxDate;             

}
