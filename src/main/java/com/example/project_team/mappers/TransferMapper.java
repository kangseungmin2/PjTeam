package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.LimitDTO;
import com.example.project_team.dto.LoanDTO;
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
	public void changeLimit(LimitDTO dto);
	
	// transferLimit (관리자) 고객 한도 요청 승인/반려
	public List<LimitDTO> transferLimit();
	
	// afterLimit
	public List<LimitDTO> afterLimit();
	
	// bringLimit
	public int bringLimit(int limitNum);
	
	// updateLimit
	public int updateLimit(Map<String, Object> map);
	
	// newLimit
	public int newLimit(Map<String, Object> map);
		
	// deleteLimit
	public int deleteLimit(int limitNum);
	
    // adminTransfer
	public List<TransferDTO> adminTransfer();

}
