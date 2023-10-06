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
@Table(name="team_join")
@Builder
@Data
public class User {

	@Id
	@Column(name="id")
	private String id;
	
	private String password;
	
	@Column(name="name")
	private String name;
	
	@Column(name="residentRegistrationNumber")
	private int residentRegistrationNumber;
	
	@Column(name="address")
	private String address;
	
	@Column(name="hp")
	private int hp;
	
	@Column(name="job")
	private String job;
	
	@Column(name="email")
	private String email;
	
	private String token;
}
