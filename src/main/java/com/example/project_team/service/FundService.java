package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.FundAccountDTO;
import com.example.project_team.dto.FundProductDTO;
import com.example.project_team.dto.FundTransactionDTO;
import com.example.project_team.exceptionHandler.CustomException;

public interface FundService {
	// fundList
	public List<FundProductDTO> fundList(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	// accountList
	public List<AccountDTO> accountList(String id)
			throws ServletException, IOException;
	
	// fundChart
	public List<FundProductDTO> fundChart(String fpName)
			throws ServletException, IOException;
	
	// fundDetail 1건 조회
	public FundProductDTO fundDetail(String fpName)
			throws ServletException, IOException;
	
	// fundAccount 1건 조회
	public FundAccountDTO fundAccount(long fAccount)
			throws ServletException, IOException;
	
	// transactionList 매도 매수 수량계산
	public int oneTransactionList(long fdAccount, String fpName)
			throws ServletException, IOException;
	
	// fundAccountSelect 계좌 다건 조회
	public List<FundAccountDTO> fundAccountSelect(String id)
			throws ServletException, IOException;

	// transactionList 계좌 거래내역 조회
	public List<FundTransactionDTO> transactionList(long fAccount)
			throws ServletException, IOException;

	// buyOrSell 매수 매도 
	public void buyOrSell(FundTransactionDTO dto, long income)
			throws CustomException;
	
	// selectTransactionList 종목명 + 계좌번호가 일치하는 거래내역 조회
	public List<FundTransactionDTO> selectTransactionList(long fdAccount, String fpName)
			throws CustomException;
	
	// insertAccount 개좌개설
	public void insertAccount(FundAccountDTO dto) 
			throws ServletException, IOException;
	
	// myFundData 내 펀드조회
	public List<FundTransactionDTO> myFundData(long fdAccount) 
			throws ServletException, IOException;
}
