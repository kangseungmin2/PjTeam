package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.CalRepaymentDTO;
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

	// 대출 신청 목록
	public List<LoanSignDTO> loanSignList(String id);

	// 이자조회 List
	public List<LoanSignDTO> signList(String id);
	public List<CalRepaymentDTO> repaymentList(String id);
	
	// 납입하기-signList
	public LoanSignDTO paySignList(Map<String, Object> map);
	// 납입하기-repaymentList
	public CalRepaymentDTO payRepaymentList(Map<String, Object> map);
	
}
