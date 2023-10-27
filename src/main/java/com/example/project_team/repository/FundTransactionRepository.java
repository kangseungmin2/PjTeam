package com.example.project_team.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.project_team.dto.FundTransactionDTO;

public interface FundTransactionRepository extends JpaRepository<FundTransactionDTO, String>{
	
	// findFundTransactionList 계좌 거래내역 조회
	@Query("SELECT ft FROM FundTransactionDTO ft WHERE ft.fdAccount = :fdAccount")
	List<FundTransactionDTO> findFundTransactionList(@Param("fdAccount") long fdAccount);
	
	// buyOrSell 매수 매도
	@Modifying
	@Query(value ="INSERT INTO team_fund_transaction (trNum,fdAccount,fpName,trCnt,trPrice,trMarketPrice,trStatus,trDate)" 
			+ "  VALUES (TO_CHAR(FLOOR(DBMS_RANDOM.VALUE(1000000000000, 9999999999999)), '9999999999999'),:#{#dto.fdAccount},"
			+ "          :#{#dto.fpName},:#{#dto.trCnt},:#{#dto.trPrice},:#{#dto.trMarketPrice},:#{#dto.trStatus},SYSDATE)", nativeQuery = true)
	void saveFundTransaction(@Param("dto") FundTransactionDTO dto);
	
	// 매수 수량 구하기
	@Query("SELECT NVL(SUM(fr.trCnt), 0) FROM FundTransactionDTO fr WHERE fr.fdAccount = :#{#buy['fdAccount']} AND fr.fpName = :#{#buy['fpName']} AND fr.trStatus = 'b'")
	Integer findFundTransactionsbuyCnt(@Param("buy") Map<String, Object> buy);
	
	// 매도 수량 구하기
	@Query("SELECT NVL(SUM(fr.trCnt), 0) FROM FundTransactionDTO fr WHERE fr.fdAccount = :#{#buy['fdAccount']} AND fr.fpName = :#{#buy['fpName']} AND fr.trStatus = 's'")
	Integer findFundTransactionssellCnt(@Param("buy") Map<String, Object> buy);
	
	// selectTransactionList 종목명 + 계좌번호가 일치하는 거래내역 조회
	@Query("SELECT fr FROM FundTransactionDTO fr WHERE fr.fdAccount = :#{#map['fdAccount']} AND fr.fpName = :#{#map['fpName']}")
	List<FundTransactionDTO> findTransactionList(@Param("map") Map<String, Object> map);

	// myFundData 내 펀드조회
	@Query(value = "SELECT fr.fpName, SUM(fr.trCnt) AS trCnt, SUM(fr.trPrice) AS trPrice, MAX(fr.trDate) AS trDate FROM team_fund_transaction fr WHERE fr.fdAccount = :fdAccount AND fr.trStatus = 'b' GROUP BY fr.fpName", nativeQuery = true)
	List<FundTransactionDTO> findMyFund(@Param("fdAccount") long fdAccount);
	
}
