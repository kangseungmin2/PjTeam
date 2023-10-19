package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.ErrorResponse;

@Mapper
public interface TransferMapper {
	
	// list
	public List<TransferDTO> transferList();

	// transferDetail
	public TransferDTO transferDetail();

	// oneTransfer 1건이체 보낼시
	public void outTransfer(Map<String, Object> map);

	// balanceChk 해당 계좌 기존 잔액 가져오기
	public int balanceChk(Map<String, Object> map);
	
	// insertTransfer 
	public void insertTransfer(Map<String, Object> map);

	// transAccount
	public List<AccountDTO> transAccount(String id);
	
	// addTransList
	public List<AccountDTO> addTransList(Map<String, Object> map);
	
	// limitAccount
	public List<AccountDTO> limitAccount(String id);
	
	// changeLimit
	public AccountDTO changeLimit(int accountNum);
}
