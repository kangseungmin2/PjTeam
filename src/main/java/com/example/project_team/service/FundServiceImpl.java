package com.example.project_team.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.FundAccountDTO;
import com.example.project_team.dto.FundProductDTO;
import com.example.project_team.dto.FundTransactionDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.mappers.FundMapper;
import com.example.project_team.repository.AccountRepository;
import com.example.project_team.repository.FundAccountRepository;
import com.example.project_team.repository.FundProductRepository;
import com.example.project_team.repository.FundTransactionRepository;

@Service
public class FundServiceImpl implements FundService{

	@Autowired
	private FundMapper mapper;
	
	@Autowired
	private FundProductRepository fpRepository;
	
	@Autowired
	private FundAccountRepository faRepository;
	
	@Autowired
	private FundTransactionRepository ftRepository;
	
	@Autowired
	private AccountRepository acRepository;
	
	// fundList
	@Override
	public List<FundProductDTO> fundList(HttpServletRequest req, Model model)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundList()");
		
		return fpRepository.fundListSelect();
	}
	
	// accountList
	@Override
	public List<AccountDTO> accountList(String id)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - accountList()");
		
		return acRepository.findFundAccountsById(id);
	}
	
	// fundChart
	@Override
	public List<FundProductDTO> fundChart(String fpName)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundChart()");
		
		return fpRepository.fundChart(fpName);
	}
	
	// fundDetail 1건 조회
	@Override
	public FundProductDTO fundDetail(String fpName)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundDetail()");
		
		return fpRepository.findFundProductsById(fpName);
	}
	
	// fundAccount 1건 조회
	@Override
	public FundAccountDTO fundAccount(long fdAccount)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundAccount()");
		
		return faRepository.findFundAccountsByAc(fdAccount);
	}
	
	// oneTransactionList 수량체크
	@Override
	public int oneTransactionList(long fdAccount, String fpName)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - transactionList()");
		
		Map<String, Object> buy = new HashMap<String, Object>();
		buy.put("fpName", fpName);
		buy.put("fdAccount", fdAccount);
		int buyCnt = ftRepository.findFundTransactionsbuyCnt(buy);
		int sellCnt = ftRepository.findFundTransactionssellCnt(buy);
		int cnt = buyCnt - sellCnt;
		return cnt;
	}
	
	// fundAccountSelect 계좌 다건 조회
	@Override
	public List<FundAccountDTO> fundAccountSelect(String id)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - fundAccountSelect()");
		
		return faRepository.findFundAccounts(id);
	}
	
	// transactionList 계좌 거래내역 조회
	@Override
	public List<FundTransactionDTO> transactionList(long fdAccount)
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - transactionList()");
		
		return ftRepository.findFundTransactionList(fdAccount);
	}
	
	// buyOrSell 매수 매도 
	@Override
	@Transactional
	public void buyOrSell(FundTransactionDTO dto) throws CustomException {
		System.out.println("FundServiceImpl - buyOrSell()");
		
		
		ftRepository.saveFundTransaction(dto);
		
		// 해당 통장 가져오기
		FundAccountDTO accountDTO = faRepository.findFundAccountsByAc(dto.getFdAccount());
		
		// 통장잔액
		int balance = accountDTO.getBalance(); 
		
		// 매수 된 수량 가져오기
		long fdAccount = dto.getFdAccount();
		Map<String, Object> buy = new HashMap<String, Object>();
		buy.put("fpName", dto.getFpName());
		buy.put("fdAccount", fdAccount);
		
		// 매수 수량 구하기
		int buyCnt = ftRepository.findFundTransactionsbuyCnt(buy);
		
		int result = 0;
		if (dto.getTrStatus().equals("b")) {
			
			// 매수시 차감금액 계산
			result = balance - dto.getTrPrice();
		}
		else {
			// 매도시 매도수량 보다 매수 수량이 많은지 체크
			if (buyCnt >= dto.getTrCnt()) {
				// 매도시 합산금액 계산
				result = balance + dto.getTrPrice();
			}
			else {
				throw new CustomException("매도 수량이 매수된 수량보다 많습니다.");
			}
		}
		if (result < 0) {
			throw new CustomException("잔액 부족"); // 잔액이 부족한 경우 롤백	
        }
		
		
		
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("fdAccount",fdAccount);
		map.put("balance",result);
		
		// 계좌 금액 업데이트
		// int updateCnt =  mapper.accountUpdate(map);
		int updateCnt =  faRepository.saveFundAccountUpdate(map);
		
		if (updateCnt != 1) {
			throw new CustomException("계좌 업데이트 실패"); // 업데이트 실패 시 롤백
	    }
	}
	
	// selectTransactionList 종목명 + 계좌번호가 일치하는 거래내역 조회
	@Override
	public List<FundTransactionDTO> selectTransactionList(long fdAccount, String fpName)
			throws CustomException{
		System.out.println("FundServiceImpl - selectTransactionList()");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("fdAccount", fdAccount);
		map.put("fpName", fpName);
		
		return ftRepository.findTransactionList(map);
	}
	
	// insertAccount 개좌개설
	@Override
	public void insertAccount(FundAccountDTO dto) 
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - insertAccount()");
		
		mapper.insertAccount(dto);
	}
	
	// myFundData 내 펀드조회
	@Override
	public List<FundTransactionDTO> myFundData(long fdAccount) 
			throws ServletException, IOException{
		System.out.println("FundServiceImpl - insertAccount()");
		
		List<FundTransactionDTO> buy = mapper.buyFundData(fdAccount);
		List<FundTransactionDTO> sell = mapper.sellFundData(fdAccount);
		
		for (FundTransactionDTO trBuy : buy) {
			for (FundTransactionDTO trSell : sell) {
				if (trBuy.getFpName().equals(trSell.getFpName())) {
                    // 키가 일치하는 경우 로직 수행
					trBuy.setTrCnt(trBuy.getTrCnt() - trSell.getTrCnt());
                }
			}
		}
		
		return buy;
	}
}
