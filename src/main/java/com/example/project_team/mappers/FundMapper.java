package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.FundAccountDTO;
import com.example.project_team.dto.FundProductDTO;

@Mapper
public interface FundMapper {
	// fundList
	public List<FundProductDTO> fundList();
	// accountList
	public List<FundAccountDTO> accountList(String id);
	// fundDetail 1건 조회
	public FundProductDTO fundDetail(String fpName);
	// fundAccount 1건 조회
	public FundAccountDTO fundAccount(long fAccount);
} 
