package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.CalRepaymentDTO;
import com.example.project_team.dto.LoanSignDTO;

@Mapper
public interface LoanSignAdminMapper {

	// 대출 신청 목록
	public List<LoanSignDTO> signList();

	// 1건 조회
	public LoanSignDTO findByNum(int loanNum);

	// 대출 신청 승인
	public int signSuccess (LoanSignDTO dto);

	// 대출계산
	public CalRepaymentDTO repayment (int loanNum);

	// repayment테이블 insert
	public int insertRepayment(CalRepaymentDTO dto);

	// 대출 신청 반려
	public int signFail (LoanSignDTO dto);

}
