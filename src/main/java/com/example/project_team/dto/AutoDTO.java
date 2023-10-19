package com.example.project_team.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_auto")
@Data
public class AutoDTO {

	@Id
	private int autoNum; 		// 이체거래번호
	private String name; 		// 고객명
	private String id; 			// 회원아이디
	private int accountNum; 	// 출금계좌번호
	private int accountPW; 		// 계좌비밀번호
	private String autoCompany; // 입금처(기업)
	private String autoType; 	// 자동이체 타입
	private Date autoDate;		// 자동이체일
	private int autoAmount; 	// 자동이체금액
	private String autoTitle; 	// 자동이체명
	private String autoDetail;  // 자동이체상세
	private int autoResult; 	// 이체상태
	private Date autoStart;		// 시작일
	private Date autoEnd; 		//해지일

}
