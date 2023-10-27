package com.example.project_team.repository;


import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.project_team.dto.FundProductDTO;


public interface FundProductRepository extends JpaRepository<FundProductDTO, String> {
	
	// 펀드상품에 최근 데이터를 select
	@Query("SELECT fd FROM FundProductDTO fd WHERE fd.eventDate = (SELECT MAX(fdd.eventDate) FROM FundProductDTO fdd)")
	List<FundProductDTO> fundListSelect();
	
	// fundChart
	@Query("SELECT fd FROM FundProductDTO fd WHERE fd.fpName = :fpName ORDER BY eventDate")
	List<FundProductDTO> fundChart(@Param("fpName") String fpName);
	
	// fundDetail 1건 조회
	@Query("SELECT fd FROM FundProductDTO fd WHERE fd.fpName = :fpName AND fd.eventDate = (SELECT MAX(fdd.eventDate) FROM FundProductDTO fdd)")
	FundProductDTO findFundProductsById(@Param("fpName") String fpName);
	
	// 은행수수료 가져오기
	@Query("SELECT fd FROM FundProductDTO fd WHERE fd.fpName = :fpName AND fd.eventDate = (SELECT MAX(fdd.eventDate) FROM FundProductDTO fdd)")
	FundProductDTO etcChk(@Param("fpName") String fpName);
}
