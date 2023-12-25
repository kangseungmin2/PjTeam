package com.example.project_team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SignUpDTO {

	private String id;
	private char[] password;
	private String name;
	private int residentRegistrationNumber;
	private String address;
	private int hp;
	private String job;
	private String email;
	private String token;
}
