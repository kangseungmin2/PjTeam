package com.example.project_team.service;

import java.util.List;

import com.example.project_team.dto.ExchangeDTO;
import com.example.project_team.dto.ExchangeListDTO;

public interface ExchangeService {

	public List<ExchangeDTO> exchangeList();
	
	public void exchangeInsert(ExchangeListDTO dto);
	
	public List<ExchangeListDTO> myList(String id);
	
	public List<ExchangeListDTO> allList();
	
	public ExchangeListDTO detailNum(int changeNum);
	
	public int changeSuccess(int changeNum);
	
	public int changeFail(int changeNum);
}
