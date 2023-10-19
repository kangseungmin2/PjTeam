package com.example.project_team.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.project_team.dto.AccountDTO;

public interface AccountRepository extends JpaRepository<AccountDTO, Long> {
	
	// accountList 펀드계좌 개설시 입출금 통장 조회용
	@Query("SELECT ac FROM AccountDTO ac WHERE ac.id = :id")
	List<AccountDTO> findFundAccountsById(@Param("id") String id);
}
