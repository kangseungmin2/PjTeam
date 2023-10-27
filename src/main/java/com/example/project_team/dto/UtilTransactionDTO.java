package com.example.project_team.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_util_transaction")
@Data
public class UtilTransactionDTO {
	
	@Id
    private long utNum;     	// 이체번호
    private long accountNum;  	// 계좌번호 fk
    private int utilityId;      // 공과금번호 fk
    private char utilityType;   // (지로/생활요금/기타 : a, 지방세/등록금 : b, 국고/관세 : c, 연금/보험료 : d)
    private int utAmount;       // 이체금액
    private Date utDate;		// 이체 날짜
    private String id;			// 회원 id
}
