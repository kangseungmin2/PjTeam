package com.example.project_team.entities;

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
@Entity // 누락 주의
@Table(name="team_admin2")
@Builder
@Data
public class Admin {

	@Id
	@Column(name="id")
	private String id;
	
	private String password;

	private String token;
}
