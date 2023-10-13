package com.example.project_team.mappers;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.FundAccountDTO;
import com.example.project_team.dto.FundProductDTO;
import com.example.project_team.dto.FundTransactionDTO;

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
	// fundAccountSelect 계좌 다건 조회
	public List<FundAccountDTO> fundAccountSelect(String id);
	// transactionList 계좌 거래내역 조회
	public List<FundTransactionDTO> transactionList(long fAccount);
} 
