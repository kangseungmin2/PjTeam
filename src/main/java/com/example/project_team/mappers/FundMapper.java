package com.example.project_team.mappers;

import java.util.List;

import java.util.Map;

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
	// buyOrSell 매수 매도 
	public int buyOrSell(FundTransactionDTO dto);
	// 매수시 계좌 업데이트
	public int accountUpdate(Map<String,Object> map);
	// 매도 수량 구하기 
	public int buyCnt(Map<String,Object> map);
	// selectTransactionList 종목명 + 계좌번호가 일치하는 거래내역 조회
	public List<FundTransactionDTO> selectTransactionList(Map<String, Object> map);
	// insertAccount 개좌개설
	public void insertAccount(FundAccountDTO dto);
	// myFundData 내 펀드조회
	public List<FundTransactionDTO> myFundData(long fdAccount);
} 
