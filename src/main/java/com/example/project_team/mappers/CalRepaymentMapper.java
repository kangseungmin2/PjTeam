package com.example.project_team.mappers;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.CalRepaymentDTO;


@Mapper
public interface CalRepaymentMapper {

	// insert
	public int insertRepayment(CalRepaymentDTO dto);
	
	// select
	public CalRepaymentDTO findByNum(int repaymentNum);
}
