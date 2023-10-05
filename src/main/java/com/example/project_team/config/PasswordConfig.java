package com.example.project_team.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component // Controller, Service, Repository가 다 아니지만 객체 생성을 해야할 때
public class PasswordConfig {

	// 암호에 대한 인코딩 알고리즘 선택
	@Bean // xml에 bean 생성하고 autowired하는 걸 하나의 어노테이션으로 됨
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
