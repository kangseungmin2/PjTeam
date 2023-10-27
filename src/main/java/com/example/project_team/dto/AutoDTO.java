package com.example.project_team.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Repository;

import lombok.Data;

@Entity
@Table(name="team_auto")
@Data
@Repository
public class AutoDTO {

	
	@Id
	private int autoNum; 		// 이체거래번호
	private String id; 			// 회원아이디
	private long accountNum; 	// 출금계좌번호
	private int accountPW; 		// 계좌비밀번호
	private long balance; 		// 계좌 잔액
	private int accountLimit;   // 일일이체한도
	private String autoCompany; // 입금처(기업)
	private long autoAccount;   // 자동이체 수취인 계좌
	private Date autoDate;		// 자동이체일
	private int autoAmount; 	// 자동이체금액
	private String autoTitle; 	// 자동이체명
	private int autoResult; 	// 이체상태
	private Date autoStart;		// 시작일
	private Date autoEnd; 		// 해지일
	


}
