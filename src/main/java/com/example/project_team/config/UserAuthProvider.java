package com.example.project_team.config;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.project_team.dto.UserDTO;
import com.example.project_team.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

	//JWT를 생성하고 검증하기 위해 pom.xml에 java-jwt 라이브러리 추가
	
	@Value("${security.jwt.token.secret-key:secret-value}")
	private String secretKey;
	private final UserService userService;
	
	@PostConstruct
	protected void init() {
		// 텍스트로 된 비밀키로 피하기 위해 base64로 인코딩
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}
	
	public String createToken(String id) {
		System.out.println("<<<UserAuthProvier - createToken()>>>");
		
		Date now = new Date(); // java.util
		Date validity = new Date(now.getTime() + 3600000); // token 유효 시간 : 1시간(0 다섯개)
		
		//JWT를 사용하려면 pom.xml에 java-jwt 추가
		
		return JWT.create()
				.withIssuer(id)
				.withIssuedAt(now)
				.withExpiresAt(validity)
				.sign(Algorithm.HMAC256(secretKey));
	}
	
	public Authentication validateToken(String token) { // Authentication : security.core 주의
		System.out.println("<<<UserAuthProvier - validateToken()>>>");
		System.out.println("UserAuthProvier - token() : " + token);
		
		// import com.auth0.jwt.JWTVerifier; 주의
		JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey))
				.build();
		
		System.out.println("<<<UserAuthProvier - validateToken 1>>>");
		DecodedJWT decoded = verifier.verify(token); // JWT를 확인하기 위해 먼저 디코딩
		
		System.out.println("<<<UserAuthProvier - validateToken 2>>>");
		UserDTO user = userService.findById(decoded.getIssuer());
		
		// 사용자 정보가 내 데이터베이스에 존재하는지 확인
		return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
	}
}