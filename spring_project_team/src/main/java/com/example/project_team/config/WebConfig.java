package com.example.project_team.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // cors 주의 - reactive이면 안됨
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class WebConfig {

	@Bean
	public FilterRegistrationBean corsFilter() {
		System.out.println("<<<WebConfig - corsFilter()>>>");
		
		// import org.springframework.web.cors 주의
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		// 프론트엔드가 일부 자격 증명을 보내면 그것들을 받아들이기 위해 필요
		CorsConfiguration config = new CorsConfiguration();
		
		System.out.println("<<<WebConfig-1>>>");
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:3000");
		config.setAllowedHeaders(Arrays.asList(
				HttpHeaders.AUTHORIZATION,
				HttpHeaders.CONTENT_TYPE,
				HttpHeaders.ACCEPT
				));
		
		System.out.println("<<<WebConfig-2>>>");
		config.setAllowedMethods(Arrays.asList(
				HttpMethod.GET.name(),
				HttpMethod.POST.name(),
				HttpMethod.PUT.name(),
				HttpMethod.DELETE.name()
				));
		
		config.setMaxAge(3600L); // 옵션 요청이 수락되는 시간 30분
		source.registerCorsConfiguration("/**", config); // Sspring Secfurity 필터 전에 사용하기 위해 요청에 적용
		
		System.out.println("<<<WebConfig-3>>>");
		// import org.springframework.web.filter.CorsFilter; 주의
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source)); // 매개변수로 source 받음
		bean.setOrder(-102); // 가장 낮은 위치
		
		System.out.println("<<<WebConfig-4>>>"); // 모두 잘 통과했는지 확인하기 위한 출력문
		
		return bean;
		
		/*
		 * CORS(Cross-Origin Resource Sharing) : 교차 출처 자원 공유
		 * 백엔드는 프론트엔드에서 오는 요청을 신뢰하지 않는다
		 * 기본적으로 백엔드는 자신에게서 오는 요청만 수락한다
		 * 따라서 프론트엔드의 요청을 수락하도록 백엔드를 구성해야한다 (Cors Policy에 의해 Not Access 해결)
		 */
	}
}