package com.example.project_team.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.FundCustomException;
import com.example.project_team.exceptionHandler.FundErrorResponse;
import com.example.project_team.mappers.TransferMapper;

@Service
public class TransferServiceImpl implements TransferService{

	@Autowired
	private TransferMapper mapper;
	
	
	// list
	@Override
	public List<TransferDTO> transferList(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("TransferServiceImpl - transferList");
		return mapper.transferList();
	}
	
	// transferDetail
	@Override
	public TransferDTO transferDetail(int transferNum) throws ServletException, IOException {
		System.out.println("TransferServiceImpl - transferDetail");
		return mapper.transferDetail();
	}

	// trAccountList
	@Override
	public List<AccountDTO> trAccountList(String id)
			throws ServletException, IOException{
		System.out.println("TransferServiceImpl - trAccountList");
		
		return mapper.trAccountList(id);
	}
	
	// oneTransfer
	@Override
	@Transactional
	public void oneTransfer(TransferDTO dto) 
		throws ServletException, IOException {
		System.out.println("TransferServiceImpl - oneTransfer");
		
		// 출금금액
		int out = 0;
		int insertCnt = 0;
		if (dto.getBalance() >= dto.getTrAmount()) {
			out = dto.getBalance() - dto.getTrAmount();
			if (dto.getAccountLimit() <= dto.getTrAmount()) {
				mapper.outTransfer(out);
			}
			else {
				throw new FundCustomException("일일 이체한도가 초과 되었습니다.");
			}
		}
		else {
			throw new FundCustomException("계좌에 잔액이 부족합니다.");
		}
		
		// 수취인 입금
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("trAmount", dto.getTrAmount());
		map.put("trAccountNum", dto.getTrAccountNum());
		
		mapper.insertTransfer(map);
		
	}

	// lmAccountList => 한도 변경 신청 전 계좌 선택
	@Override
	public List<AccountDTO> lmAccountList(String id)
			throws ServletException, IOException{
		System.out.println("TransferServiceImpl - lmAccountList");
		
		return mapper.trAccountList(id);
	}
		
	// changeLimit
	@Override
	public AccountDTO changeLimit(int accountNum) 
			throws ServletException, IOException {
		
		return null;
		
	}



}
