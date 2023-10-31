package com.example.project_team.repository;





import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.project_team.dto.FundIncomeDTO;


public interface FundIncomeRepository extends JpaRepository<FundIncomeDTO, String> {
	// 해당 펀드종목 수익 가져오기
	@Query("SELECT fi.income FROM FundIncomeDTO fi WHERE fi.fpName = :fpName")
	Object fundIncom(@Param("fpName") String fpName);
	
	// 처음 상품 수익률 insert
	@Modifying
	@Query(value = "INSERT INTO team_fund_income (incomenum, fpname, income)"
			+ " VALUES ((SELECT NVL(MAX(incomenum)+1,1) FROM team_fund_income), :#{#map['fpName']}, :#{#map['insertCnt']})", nativeQuery = true)
	int fundIncomInsert(@Param("map") Map<String, Object> map);
	
	// 상품에 수익률 추가
	@Modifying
	@Query("UPDATE FundIncomeDTO fi " +
			 " SET fi.income = :#{#map['updateCnt']} " +
			 " WHERE fi.fpName = :#{#map['fpName']}")
	int fundIncomUpdate(@Param("map") Map<String, Object> map);
	

}
