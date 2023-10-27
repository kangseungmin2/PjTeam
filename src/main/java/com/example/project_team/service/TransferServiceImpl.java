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
import com.example.project_team.dto.LimitDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.exceptionHandler.ErrorResponse;
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
		return mapper.transferDetail(transferNum);
	}

	// transAccount
	@Override
	public List<AccountDTO> transAccount(String id)
			throws ServletException, IOException{
		System.out.println("TransferServiceImpl - transAccount");
		
		return mapper.transAccount(id);
	}
	
	// oneTransfer
	@Override
	@Transactional
	public void oneTransfer(TransferDTO dto) 
		throws CustomException {
		System.out.println("TransferServiceImpl - oneTransfer");
		
		Map<String, Object> map = new HashMap<String, Object>();
		// 출금금액
		int out = 0;
		map.put("accountNum", dto.getAccountNum()); // 출금계좌번호
		map.put("trAccountNum", dto.getTrAccountNum()); // 보낼계좌번호
		// 해당 계좌 잔액
		int balance = mapper.balanceChk(map);
		// 계좌잔액 >= 이체금액
		if (dto.getBalance() >= dto.getTrAmount()) {
			// 일일이체한도 초과여부 체크 부분
			
			
			// 계좌잔액 - 이체금액
			out = dto.getBalance() - dto.getTrAmount();
			
			map.put("out", out); // 빠질금액(out)
			// 이체한도 <= 이체금액
			if (dto.getAccountLimit() >= dto.getTrAmount()) {
				// 금액 빠져나감
				mapper.outTransfer(map);
			}
			else {
				throw new CustomException("일일 이체한도가 초과 되었습니다.");
			}
		}
		else {
			throw new CustomException("계좌에 잔액이 부족합니다.");
		}
		
		// 수취인 입금
		int in = balance + dto.getTrAmount();
		// 입금금액(in)
		map.put("in", in);
		// 계좌번호(dto.getTrAccountNum())
		map.put("trAccountNum", dto.getTrAccountNum());
		mapper.insertTransfer(map);
		
		// 이체 목록에 추가
		int insertCnt = mapper.addTransList(dto);
		if (insertCnt == 0) {
		throw new CustomException("서버오류 - 거래진행 중단");
		}
		
	}

	// limitAccount => 한도 변경 신청 전 계좌 선택
	@Override
	public List<AccountDTO> limitAccount(String id)
		throws ServletException, IOException{
		System.out.println("TransferServiceImpl - limitAccount");
		
		return mapper.limitAccount(id);
	}
		
	// changeLimit
	@Override
	public int changeLimit(LimitDTO dto) 
		throws ServletException, IOException {
		System.out.println("TransferServiceImpl - changeLimit");
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		return mapper.changeLimit(dto);
	}

	// transferLimit
//	@Override
//	public LimitDTO transferLimit(int limitNum) 
//			throws ServletException, IOException {
//		System.out.println("TransferServiceImpl - transferLimit");
//		
//		return mapper.transferLimit(limitNum);
//	}


}
