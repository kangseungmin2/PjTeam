package com.example.project_team.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_board")
@Data
public class BoardDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "team_board_sequence")
    @SequenceGenerator(name = "team_board_sequence", sequenceName = "team_board_sequence", allocationSize = 1)
    @Column(name = "num")
	private int num;
	private String title;
	private String content;
}
