package com.example.project_team.repository;


import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.project_team.dto.FundProductDTO;


public interface FundProductRepository extends JpaRepository<FundProductDTO, String> {
	
	// fundDetail 1건 조회
	@Query("SELECT fd FROM FundProductDTO fd WHERE fd.fpName = :fpName")
	FundProductDTO findFundProductsById(@Param("fpName") String fpName);
}
