package com.example.project_team.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_board")
@Data
public class BoardDTO {
	
	@Id
	private int num;
	private String title;
	private String content;
}
