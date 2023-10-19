package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.mappers.AccountMapper;

@Service
public class AccountService {

	@Autowired
	private AccountMapper mapper;
	
	public int insertAccount(AccountDTO dto) throws ServletException, IOException{
		System.out.println("서비스 - insert");
		return mapper.insertAccount(dto);
	}
	
	public List<AccountDTO> accountList(String id) throws ServletException, IOException {
		System.out.println("서비스 - 전제조회");
		return mapper.accountList(id);
	}
	
	public List<AccountDTO> accountListE(String id) throws ServletException, IOException {
		System.out.println("서비스 - 전제조회");
		return mapper.accountListE(id);
	}
	
	public List<AccountDTO> accountListY(String id) throws ServletException, IOException {
		System.out.println("서비스 - 전제조회");
		return mapper.accountListY(id);
	}
	
	
	public int passwordModify(AccountDTO dto)throws ServletException, IOException{
		System.out.println("서비스 - passwordModify");
		return mapper.passwordModify(dto);
	}
	
	public AccountDTO fetchAccountByNum(long accountNum) throws ServletException, IOException{
		System.out.println("서비스 - fetchAccountByNum");
		return mapper.fetchAccountByNum(accountNum);
	}
	
	public int deleteAccount(long accountNum) throws ServletException, IOException{
		System.out.println("서비스 - deleteAccount");
		return mapper.deleteAccount(accountNum);
	}
}
