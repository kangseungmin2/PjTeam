package com.example.project_team.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.UtilTransactionDTO;
import com.example.project_team.dto.UtilityDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.mappers.UtilityMapper;

@Service
public class UtilityService {

	@Autowired
	private UtilityMapper mapper;
	
	public int utilPay1(UtilTransactionDTO dto) throws ServletException, IOException{
		System.out.println("서비스 - insert");
		return mapper.utilPay1(dto);
	}
	
	public List<UtilTransactionDTO> utilityList(String id) throws ServletException, IOException {
		System.out.println("서비스 - 전제조회");
		List<UtilTransactionDTO> dto = mapper.utilityList(id);
		System.out.println("dto"+dto);
		return dto;
	}
		
	public AccountDTO fetchAccountByNum(long accountNum) throws ServletException, IOException{
		System.out.println("서비스 - fetchAccountByNum");
		return mapper.fetchAccountByNum(accountNum);
	}
	
	public UtilityDTO utilityInfo(String utilityId) {
		System.out.println("서비스 - 하나만 조회");
		return mapper.utilityInfo(utilityId);
	}
	
	public UtilityDTO utilityCheck(String utilityType, String utilityId) {
		System.out.println("서비스 - 유무체크");
		Map<String, Object> map = new HashMap<String, Object>(); 
		map.put("utilityType", utilityType);
		map.put("utilityId", utilityId);
		UtilityDTO dto = mapper.utilityCheck(map);
		System.out.println("dto"+dto);
		return dto;
	}
	
	//즉시이체
	@Transactional
	public void utilTransfer(UtilTransactionDTO dto) throws CustomException {
		System.out.println("서비스 - utilTransfer()");
		System.out.println("dto"+dto);
		// 통장잔액
		AccountDTO accountDTO = mapper.fetchAccountByNum(dto.getAccountNum());
		int balance = (int)accountDTO.getBalance();
		System.out.println("getBalance" + accountDTO.getBalance());
		Map<String, Object> map = new HashMap<String, Object>(); 
		map.put("accountNum", dto.getAccountNum());
		
		if(balance >= dto.getUtAmount()) {
			System.out.println("여기");
			int result = balance - dto.getUtAmount(); //출금잔액
			map.put("result", result);
			mapper.updateBalance(map);
		}
		else {
			System.out.println("여기2");
			throw new CustomException("계좌 잔액이 부족합니다."); // 업데이트 실패 시 롤백
		}
		int insertCnt = mapper.utilTransfer(dto);
		if(insertCnt == 1) {
			mapper.transferChk(dto.getUtilityId());
		}
		else {
			System.out.println("납부완료된 전자번호");
		}
	}
	// 회원 결산
	public List<UtilTransactionDTO> openAccountData2() throws ServletException, IOException {
		System.out.println("서비스 - 회원결산");
		return mapper.openAccountData2();
	}
	
	
}
