package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.FundAccountDTO;
import com.example.project_team.dto.FundProductDTO;
import com.example.project_team.dto.FundTransactionDTO;
import com.example.project_team.mappers.FundMapper;

@Service
public class FundServiceImpl implements FundService{

	@Autowired
	private FundMapper mapper;
	
	// fundList
	@Override
	public List<FundProductDTO> fundList(HttpServletRequest req, Model model)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundList()");
		
		return mapper.fundList();
	}
	
	// accountList
	@Override
	public List<FundAccountDTO> accountList(String id)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - accountList()");
		
		return mapper.accountList(id);
	}
	
	// fundDetail 1건 조회
	@Override
	public FundProductDTO fundDetail(String fpName)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundDetail()");
		
		return mapper.fundDetail(fpName);
	}
	
	// fundAccount 1건 조회
	@Override
	public FundAccountDTO fundAccount(long fAccount)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundAccount()");
		
		return mapper.fundAccount(fAccount);
	}
	
	// fundAccountSelect 계좌 다건 조회
	@Override
	public List<FundAccountDTO> fundAccountSelect(String id)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundAccountSelect()");
		
		return mapper.fundAccountSelect(id);
	}
	
	// transactionList 계좌 거래내역 조회
	@Override
	public List<FundTransactionDTO> transactionList(long fAccount)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - transactionList()");
		
		return mapper.transactionList(fAccount);
	}
	
}
