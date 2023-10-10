package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.FundProductDTO;

@Mapper
public interface FundMapper {
	public List<FundProductDTO> fundList();
} 
