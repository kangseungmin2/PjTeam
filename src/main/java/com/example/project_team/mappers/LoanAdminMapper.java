package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.LoanDTO;

@Mapper
public interface LoanAdminMapper {

	public List<LoanDTO> LoanAdminList();
	public int insertLoan(LoanDTO dto);
	public int updateLoan(LoanDTO dto);
	public int deleteByNum(int num);
	public LoanDTO findByNum(int num);
	
}

