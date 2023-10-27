package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.AccountDTO;


@Mapper
public interface AccountMapper {
	// 계좌 생성
	public int insertAccount(AccountDTO dto);
	// 전체 리스트
	public List<AccountDTO> accountList(String id);
	// 전체 리스트- 입출금
	public List<AccountDTO> accountListE(String id);
	// 전체 리스트- 예금
	public List<AccountDTO> accountListY(String id);
	// 전체 리스트- 적금
	public List<AccountDTO> accountListJ(String id);
	// 전체 리스트- 대출
	public List<AccountDTO> accountListD(String id);

	// 비밀번호 변경
	public int passwordModify(AccountDTO dto);
	// 1건조회
	public AccountDTO fetchAccountByNum(long accountNum);
	// 계좌 해지
	public int deleteAccount(long accountNum);
	// 관리자 결산
	public List<AccountDTO> openAccountData();
}
