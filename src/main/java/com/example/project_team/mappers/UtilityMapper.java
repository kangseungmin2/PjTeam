package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.UtilTransactionDTO;
import com.example.project_team.dto.UtilityDTO;
import com.example.project_team.exceptionHandler.ErrorResponse;


@Mapper
public interface UtilityMapper {

	public int utilPay1(UtilTransactionDTO dto);
	
	public List<UtilTransactionDTO> utilityList(String id);
	
	public AccountDTO fetchAccountByNum(long accountNum);
	
	public UtilityDTO utilityCheck(Map<String, Object> map);

	public UtilityDTO utilityInfo(String utilityId);
	
	//즉시 이체
	public UtilTransactionDTO utilTransfer(long utNum);
	
	//출금금액에서 납부금액 빼기
	public void updateBalance(Map<String, Object> map);
	//납부계좌번호
	public int insertBalance(UtilTransactionDTO dto);
	
	public int utilTransfer(UtilTransactionDTO dto);
	
	//납부완료체크
	public int transferChk(int utilityId);
	
	//회원 결산
	public List<UtilTransactionDTO> openAccountData2();
}
