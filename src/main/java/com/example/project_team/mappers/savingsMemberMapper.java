package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.SavingsDTO;


@Mapper
public interface savingsMemberMapper {
 
	public List<SavingsDTO> SavingsMemberList();
	public SavingsDTO findByNum(int juckNo);
}
