package com.example.project_team.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;


//보안 컨텍스트(SecurityContext)에 인증 빈(Authentication)을 추가하면, 모든 컨트롤러에서 @AuthenticationPrincipal 주석을 입력 매개변수로 추가할 수 있다. 
//public ResponseEntity< > reqularEndpoint(@AuthenticationPrincipal UserDTO) => 인증된 사용자를 주입
//따라서 Filter는 인증된 사용자의 개체를 Controller에 제공한다. 인증빈을 반환하기 위해

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter { // 요청당 한번만 사용되기를 원하므로 OncePerRequestFilter를 사용

	private final UserAuthProvider userAuthProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("<<<JwtAuthFilter - doFilterInternal>>>");
		
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if(header != null) {
			String[] elements = header.split("");
			if(elements.length == 2 && "Bearer".equals(elements[0])) {
				try {
					SecurityContextHolder.getContext().setAuthentication(userAuthProvider.validateToken(elements[1]));
				} catch(RuntimeException e) {
					SecurityContextHolder.clearContext(); // 문제가 발생하면 보안 컨텍스트를 지우고 오류를 발생시킨다
					throw e;
				}
			}
		}
		filterChain.doFilter(request, response); // 필터 끝에서 doFilter() 메서드 호출
	}
}
