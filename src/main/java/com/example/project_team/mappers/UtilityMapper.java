package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.UtilityDTO;


@Mapper
public interface UtilityMapper {

//	public int insertAccount(AccountDTO dto);
	
	public List<UtilityDTO> utilityList(String id);
	
//	public AccountDTO fetchAccountByNum(long accountNum);

}
