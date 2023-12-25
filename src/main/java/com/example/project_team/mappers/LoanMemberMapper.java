package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.LoanDTO;

@Mapper
public interface LoanMemberMapper {

	public List<LoanDTO> LoanMemberList();
	public LoanDTO findByNum(int num);
	
}

