package com.example.project_team.controller;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.config.UserAuthProvider;
import com.example.project_team.dto.AdminCredentialsDTO;
import com.example.project_team.dto.CredentialsDTO;
import com.example.project_team.dto.SignUpDTO;
import com.example.project_team.entities.Admin;
import com.example.project_team.entities.User;
import com.example.project_team.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // 생성자에 멤 버변수 주입
@RestController
public class AuthController {

	// http://localhost:8081
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	private final UserService userService;
	private final UserAuthProvider userAuthProvider;
	
	@GetMapping({"", "/"}) // 조회
	public String index() {
		logger.info("<<<url - index>>>");
		
		return "index";
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody CredentialsDTO credentialsDTO) {
		System.out.println("<<<AuthController - login>>>");
		
		User user = userService.login(credentialsDTO);
		System.out.println("token : " + userAuthProvider.createToken(user.getId()));
		
		user.setToken(userAuthProvider.createToken(user.getId()));
		
		return ResponseEntity.ok(user); // 새로운 JWT를 반환 // 크롬 F12 > Network > Headers : 200 OK
	}
	
	@PostMapping("/admin")
	public ResponseEntity<Admin> admin(@RequestBody AdminCredentialsDTO AdminCredentialsDTO){
		System.out.println("<<<AuthController - admin>>>");
		
		Admin admin = userService.admin(AdminCredentialsDTO);
		System.out.println("token : " + userAuthProvider.createToken(admin.getId()));
		
		admin.setToken(userAuthProvider.createToken(admin.getId()));
		
		return ResponseEntity.ok(admin); // 새로운 JWT를 반환 // 크롬 F12 > Network > Headers : 200 OK
	}
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody SignUpDTO signUpDTO) {
		System.out.println("<<<AuthController - register>>>");
		
		// 엔티티를 새애성할 때 새 엔티티를 찾을 수 있는 URL과 함께 201 HTTP 코드를 반환하는 것이 가장 좋음
		User user = new User();
		signUpDTO.setToken(userAuthProvider.createToken(user.getId()));
		user =userService.register(signUpDTO); // 추가
		
		return ResponseEntity.created(URI.create("/users/" + user.getId()))
				.body(user); // 크롬 F12 > Network > Headers : 201 Created
	}

}
