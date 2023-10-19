package com.example.project_team.dto;
import java.math.BigDecimal;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_utilities")
@Data
public class UtilityDTO {
	
	@Id
	private int utilityId;			//공과금구분 id pk
	private String id;       		//회원 아이디 fk
	private char utilityType;		//타입
	private long accountNum;    	//계좌번호 fk
	private BigDecimal amount;		//금액
	private Date notificationDate;	//고지년월
	private Date transactionDate;	//납부기한
}
