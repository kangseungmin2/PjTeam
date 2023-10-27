package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.AutoDTO;
import com.example.project_team.dto.TransferDTO;

@Mapper
public interface AutoMapper {
	
	// autolist
	public List<AutoDTO> autoList();
	
	// autoDetail
	public AutoDTO autoDetail(int autoNum);
	
	// autoAccount
	public List<AccountDTO> autoAccount(String id);
	
	// outAuto 자동이체 보낼시
	public void outAuto(Map<String, Object> map);
	
	// mBalanceChk 출금 계좌 기존 잔액 가져오기
	public int mBalanceChk(Map<String, Object> map);
	
	// balanceChk 해당 계좌 기존 잔액 가져오기
	public int balanceChk(Map<String, Object> map);
	
	// insertAuto 
	public void insertAuto(Map<String, Object> map);

	// addAutoList
	public int addAutoList(AutoDTO dto);
	
	// changeAuto
	public AutoDTO changeAuto(int autoNum);
	
	// alterAutoDateList
	public AutoDTO alterAutoDateList(int autoNum);
	
}
