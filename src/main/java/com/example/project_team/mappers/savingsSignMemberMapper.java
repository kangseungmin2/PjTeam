package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.SavingsDTO;
import com.example.project_team.dto.SavingsSignDTO;

@Mapper
public interface savingsSignMemberMapper {

	// 적금상품 상세조회
	public SavingsDTO findByNum(int juckNo);
	
	// 계좌 조회
	public List<AccountDTO> accountList(String id);
	
	// 계좌 비밀번호 확인
	public int pwCheck (Map<String, Object> list);
	
	// sign테이블 insert
	public int insertSign(SavingsSignDTO dto);
}
