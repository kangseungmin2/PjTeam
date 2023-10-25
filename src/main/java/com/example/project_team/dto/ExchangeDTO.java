package com.example.project_team.dto;


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
@Table(name="team_exchange")
@Builder
@Data
public class ExchangeDTO {

	@Id
	private int exchangeNum;
	
	private String nation;
	private float price;
}

