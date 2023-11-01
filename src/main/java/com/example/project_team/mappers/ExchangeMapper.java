package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.ExchangeDTO;
import com.example.project_team.dto.ExchangeListDTO;

@Mapper
public interface ExchangeMapper {

	public List<ExchangeDTO> exchangeList();
	
	public int exchangeInsert(ExchangeListDTO dto);
	
	public List<ExchangeListDTO> myList(String id);
	
	public List<ExchangeListDTO> allList();
	
	public ExchangeListDTO detailNum(int changeNum);
	
	public int changeSuccess(int changeNum);
	
	public int changeFail(int changeNum);
	
	public int saveAccount(Map<String,Object> map);
}
