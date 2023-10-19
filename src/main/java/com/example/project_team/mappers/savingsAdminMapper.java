package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.SavingsDTO;


@Mapper
public interface savingsAdminMapper {
	
	public List<SavingsDTO> SavingsAdminList();
	public int insertSavings(SavingsDTO dto);
	public int updateSavings(SavingsDTO dto);
	public int deleteByNum(int juckNo);
	public SavingsDTO findByNum(int juckNo);
}
