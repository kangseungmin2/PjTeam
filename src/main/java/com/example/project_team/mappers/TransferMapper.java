package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.LimitDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.ErrorResponse;

@Mapper
public interface TransferMapper {
	
	// list
	public List<TransferDTO> transferList();

	// transferDetail
	public TransferDTO transferDetail(int transferNum);

	// transAccount
	public List<AccountDTO> transAccount(String id);
	
	// outTransfer 1건이체 보낼시
	public void outTransfer(Map<String, Object> map);

	// balanceChk 해당 계좌 기존 잔액 가져오기
	public int balanceChk(Map<String, Object> map);
	
	// insertTransfer 
	public void insertTransfer(Map<String, Object> map);

	// addTransList
	public int addTransList(TransferDTO dto);
	
	// limitAccount
	public List<AccountDTO> limitAccount(String id);
	
	// changeLimit 
	public int changeLimit(LimitDTO dto);
	
	// transferLimit (관리자) 고객 한도 요청 승인/반려
//	public LimitDTO transferLimit(int limitNum);

}
