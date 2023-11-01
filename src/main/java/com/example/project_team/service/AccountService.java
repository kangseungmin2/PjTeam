package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.FundAccountDTO;
import com.example.project_team.dto.LoanSignDTO;
import com.example.project_team.mappers.AccountMapper;

@Service
public class AccountService {

	@Autowired
	private AccountMapper mapper;
	
	// 계좌 생성
	public int insertAccount(AccountDTO dto) throws ServletException, IOException{
		System.out.println("서비스 - insert");
		return mapper.insertAccount(dto);
	}
	
	//생성완료된 계좌
	public AccountDTO successAccount(String id) throws ServletException, IOException{
		System.out.println("서비스 - successAccount");
		return mapper.successAccount(id);
	}
	
	// 전체 리스트
	public List<AccountDTO> accountList(String id) throws ServletException, IOException {
		System.out.println("서비스 - 전제조회");
		return mapper.accountList(id);
	}
	// 전체 리스트- 입출금
	public List<AccountDTO> accountListE(String id) throws ServletException, IOException {
		System.out.println("서비스 - 전제조회");
		return mapper.accountListE(id);
	}
	// 전체 리스트- 예금
	public List<AccountDTO> accountListY(String id) throws ServletException, IOException {
		System.out.println("서비스 - 전제조회");
		return mapper.accountListY(id);
	}
	// 전체 리스트- 적금
	public List<AccountDTO> accountListJ(String id) throws ServletException, IOException {
		System.out.println("서비스 - 전제조회");
		return mapper.accountListJ(id);
	}

	// 비밀번호 변경
	public int passwordModify(AccountDTO dto)throws ServletException, IOException{
		System.out.println("서비스 - passwordModify");
		return mapper.passwordModify(dto);
	}
	// 1건조회
	public AccountDTO fetchAccountByNum(long accountNum) throws ServletException, IOException{
		System.out.println("서비스 - fetchAccountByNum");
		return mapper.fetchAccountByNum(accountNum);
	}
	// 계좌 해지
	public int deleteAccount(long accountNum) throws ServletException, IOException{
		System.out.println("서비스 - deleteAccount");
		return mapper.deleteAccount(accountNum);
	}
	// 관리자 결산 - 입출금
	public List<AccountDTO> openAccountData() throws ServletException, IOException {
		System.out.println("서비스 - 관리자결산 입출금");
		List<AccountDTO> dto = mapper.openAccountData();
		System.out.println("dto"+dto);
		return dto;
	}
	
	// 관리자 결산 - 대출
	public List<LoanSignDTO> openAccountData2() throws ServletException, IOException {
		System.out.println("서비스 - 관리자결산2");
		return mapper.openAccountData2();
	}
	
	// 관리자 결산 - 펀드
	public List<FundAccountDTO> openAccountData3() throws ServletException, IOException {
		System.out.println("서비스 - 관리자결산3");
		return mapper.openAccountData3();
	}
	
	
}
