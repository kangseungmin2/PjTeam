package com.example.project_team.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.project_team.dto.FundAccountDTO;

public interface FundAccountRepository extends JpaRepository<FundAccountDTO, Long>{
	
	// fundAccount 1건 조회
	@Query("SELECT fa FROM FundAccountDTO fa WHERE fa.fdAccount = :fdAccount")
	FundAccountDTO findFundAccountsByAc(@Param("fdAccount") long fdAccount);
	
	// fundAccountSelect 계좌 다건 조회 
	@Query("SELECT fa FROM FundAccountDTO fa WHERE fa.id = :id")
	List<FundAccountDTO> findFundAccounts(@Param("id") String id);
	
	// 계좌 금액 업데이트
	@Modifying
	@Query("UPDATE FundAccountDTO fa " +
	       "   SET fa.balance = :#{#map['balance']} " +
	       " WHERE fa.fdAccount = :#{#map['fdAccount']}")
	int saveFundAccountUpdate(@Param("map") Map<String, Object> map);
	
	// insertAccount 개좌개설
	@Modifying
	@Query(value ="INSERT INTO team_fund_account (fdAccount,id,fdPw,accountNum)"
			+ "    VALUES (TO_CHAR(1002452||TRUNC(DBMS_RANDOM.VALUE(1, 999999), 0)),"
			+ "			:#{#dto.id}, :#{#dto.fdPw}, :#{#dto.accountNum})", nativeQuery = true)
	void insertAccount(@Param("dto") FundAccountDTO dto);
}
