package com.example.project_team.mappers;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.DepositDTO;
import com.example.project_team.dto.DepositSignDTO;

@Mapper
public interface depositSignMemberMapper {

	// 예금상품 상세조회
	public DepositDTO findByNum(int yeNo);
	
	// 계좌 조회
	public List<AccountDTO> accountList(String id);
	
	// 계좌 비밀번호 확인
	public int pwCheck (Map<String, Object> list);
	
	// sign테이블 insert
	public int insertSign(DepositSignDTO dto);
	// 대출 신청 목록
   public List<DepositSignDTO> depositSignList(String id);
   
   public DepositSignDTO signList(int yeSignNo);
   
   public void cancelDeposit(DepositSignDTO dto);
   
   public int accountBalance(long accountNum);
   
   public int inputMoney(Map<String, Object> map);
}
