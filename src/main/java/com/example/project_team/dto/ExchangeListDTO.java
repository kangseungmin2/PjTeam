package com.example.project_team.dto;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="team_exchange_list")
@Builder
@Data
public class ExchangeListDTO {

	@Id
	private int changeNum;
	private String nation;
    private float tprice;
    private float rprice;
	private String id;
	private long accountNum;
	private Date changeDate;
	private String nonState;

}
