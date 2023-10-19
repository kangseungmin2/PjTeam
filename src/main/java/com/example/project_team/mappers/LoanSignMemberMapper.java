package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.LoanDTO;
import com.example.project_team.dto.LoanSignDTO;

@Mapper
public interface LoanSignMemberMapper {

	// 대출상품 상세조회
	public LoanDTO findByNum(int num);
	
	// 계좌 조회
	public List<AccountDTO> accountList(String id);
	
	// 계좌 비밀번호 확인
	public int pwCheck (Map<String, Object> list);
	
	// sign테이블 insert
	public int insertSign(LoanSignDTO dto);
}
