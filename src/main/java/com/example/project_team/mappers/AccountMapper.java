package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.AccountDTO;


@Mapper
public interface AccountMapper {

	public int insertAccount(AccountDTO dto);
	
	public List<AccountDTO> accountList();
	
	public List<AccountDTO> accountList2();
	
	public int passwordModify(AccountDTO dto);
	
	public AccountDTO fetchAccountByNum(long accountNum);
	
	public int deleteAccount(long accountNum);
}
