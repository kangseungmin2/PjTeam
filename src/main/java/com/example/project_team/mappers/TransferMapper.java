package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.FundErrorResponse;

@Mapper
public interface TransferMapper {
	public List<TransferDTO> transferList();
	
	public TransferDTO transferDetail();
	
	public void outTransfer(int out);
	
	public void insertTransfer(Map<String, Object> map);
	
	public List<AccountDTO> trAccountList(String id);
	
	public List<AccountDTO> lmAccountList(String id);
	
	public AccountDTO changeLimit(int accountNum);
}
