package com.example.project_team.service;

import java.io.IOException;
import java.util.Date;
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
import com.example.project_team.dto.CalRepaymentDTO;
import com.example.project_team.dto.LoanDTO;
import com.example.project_team.dto.LoanSignDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.mappers.LoanSignMemberMapper;

@Service
public class LoanSignMemberServiceImpl implements LoanSignMemberService {

	@Autowired
	private LoanSignMemberMapper dao;


	// 대출 상세정보
	@Override
	public LoanDTO selectLoan(int num) throws ServletException, IOException {
		System.out.println("LoanSignMemberServiceImpl - selectLoan");
		return dao.findByNum(num);
	}

	// 계좌 조회
	@Override
	public List<AccountDTO> listAll(String id) throws ServletException, IOException {
		System.out.println("LoanSignMemberServiceImpl - listAll");
		return dao.accountList(id);
	}

	// 계좌 비밀번호 체크
	@Override
	public int pwCheck(long accountNum, String id) throws ServletException, IOException {
		System.out.println("LoanSignMemberServiceImpl - listAll");
		Map<String, Object> list = new HashMap<String, Object>();
		list.put("accountNum",accountNum);
		list.put("id",id);
		return dao.pwCheck(list);
	}

	// sign테이블 insert
	@Override
	public int insertSign(LoanSignDTO dto) throws ServletException, IOException {
		System.out.println("LoanSignMemberServiceImpl - insertSign");
		return dao.insertSign(dto);
	}

	// 대출 신청 목록
	@Override
	public List<LoanSignDTO> loanSignList(String id) throws ServletException, IOException {
		return dao.loanSignList(id);
	}
	
	// 본인인증
	@Override
	public long checkIdentity(String id) throws ServletException, IOException {
		return dao.checkIdentity(id);
	}

	// 이자조회 List
	@Override
	public List<LoanSignDTO> signList(String id) throws ServletException, IOException {
		return dao.signList(id);
	}

	@Override
	public List<CalRepaymentDTO> repaymentList(String id) throws ServletException, IOException {
		return dao.repaymentList(id);
	}

	// 납입하기-signList
	@Override
	public LoanSignDTO paySignList(Map<String, Object> map) throws ServletException, IOException {
		return dao.paySignList(map);
	}

	// 납입하기-repaymentList
	@Override
	public CalRepaymentDTO payRepaymentList(Map<String, Object> map) throws ServletException, IOException {
		return dao.payRepaymentList(map);
	}

	// 납입하기-repayment update
	@Override
	@Transactional
	public int updateRepayment(CalRepaymentDTO dto)  throws CustomException {
		System.out.println("처음dto"+dto);
		System.out.println("LoanSignAdminServiceImpl - insertRepayment");

		// 입출금통장 잔액
		int accountNumBalance = dao.accountBalance(dto.getAccountNum());
		// 월 금리
		double monthlyInterestRate = (double)dto.getInterestRate() / 12 / 100;
		// 상환회차
		int paymentRound = dto.getPaymentRound();
		// 총 상환 회차
		int totalPaymentRounds = dto.getLoanPeriod() * 12;
		System.out.println("총기간 : "+ totalPaymentRounds);
		// 월 상환금
		double repaymentMonth = dto.getRepaymentMonth();
		// 이자
		double interest = dto.getInterest();
		// 납입원금
		double repaymentAmount = dto.getRepaymentAmount();

		if("만기일시상환".equals(dto.getRepayment())) {
			System.out.println("만기일시상환");
			
			if(paymentRound < totalPaymentRounds-1) {
				System.out.println("회차" +paymentRound );
				System.out.println("총회차" + totalPaymentRounds);
				// 잔액
				int amountBalance = dto.getAmountBalance();
				// 이자
				interest = dto.getLoanAmount() * monthlyInterestRate;
				// 납입원금
				repaymentAmount = 0;
				// 월 상환금
				repaymentMonth = interest + repaymentAmount;
				// 회차 증가
				paymentRound += 1;
				// 계좌잔액이 월상환금보다 같거나 많으면
				if(accountNumBalance >= repaymentMonth) {
					dto.setRepaymentAmount(repaymentAmount);
					dto.setInterest(interest);
					dto.setRepaymentMonth(repaymentMonth);
					dto.setAmountBalance(amountBalance);
					dto.setPaymentRound(paymentRound);
					// 입출금통장-월상환금
					int sub = (int) (accountNumBalance-repaymentMonth);
					Map<String, Object> map = new HashMap<String,Object>();
					map.put("accountNum", dto.getAccountNum());
					map.put("sub", sub);
					dao.subRepayment(map);
				}
				else {
					throw new CustomException("계좌에 잔액이 부족합니다.");
				}
			}
			else if(paymentRound == totalPaymentRounds-1) {
				System.out.println("회차 : " +paymentRound );
				System.out.println("마지막계산");
				// 이자
				interest = dto.getLoanAmount() * monthlyInterestRate;
				// 대출 기간이 끝났을 때, 대출원금 납부
				int amountBalance = dto.getAmountBalance();
				repaymentAmount = amountBalance;
				amountBalance = 0;
				// 월 상환금
				repaymentMonth = interest + repaymentAmount;
				// 회차 증가
				paymentRound += 1;
				// 계좌잔액이 월상환금보다 같거나 많으면
				if(accountNumBalance >= repaymentMonth) {
					dto.setRepaymentAmount(repaymentAmount);
					dto.setInterest(interest);
					dto.setRepaymentMonth(repaymentMonth);
					dto.setAmountBalance(amountBalance);
					dto.setPaymentRound(paymentRound);
					// 입출금통장-월상환금
					int sub = (int) (accountNumBalance-repaymentMonth);
					Map<String, Object> map = new HashMap<String,Object>();
					map.put("accountNum", dto.getAccountNum());
					map.put("sub", sub);
					dao.subRepayment(map);
				}
				else {
					throw new CustomException("계좌에 잔액이 부족합니다.");
				}
			}
			else {
				Map<String, Object> map = new HashMap<String,Object>();
				map.put("loanNum", dto.getLoanNum());
				map.put("payDate", dto.getPayDate());
				dao.accountState(map);
			}
				
		}
		else if("원리금균등상환".equals(dto.getRepayment())) {
			System.out.println("원리금균등상환");
			
			if(paymentRound < totalPaymentRounds-1) {
				System.out.println("2회차");
				// 잔액
				int amountBalance = dto.getAmountBalance();
				// 이자 = 남은 원금 * 월 이자율
				interest = amountBalance * monthlyInterestRate;
				// 월 상환금 (월 이자 + 월 납입원금)
				repaymentMonth = (dto.getLoanAmount() * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPaymentRounds));
				// 납입원금
				repaymentAmount = repaymentMonth - interest;
				// 대출 잔액 업데이트(잔액-납입원금)
				amountBalance -= repaymentAmount;
				// 회차증가
				paymentRound += 1;
				// 계좌잔액이 월상환금보다 같거나 많으면
				if(accountNumBalance >= repaymentMonth) {
					dto.setRepaymentAmount(repaymentAmount);
					dto.setInterest(interest);
					dto.setRepaymentMonth(repaymentMonth);
					dto.setAmountBalance(amountBalance);
					dto.setPaymentRound(paymentRound);
					// 입출금통장-월상환금
					int sub = (int) (accountNumBalance-repaymentMonth);
					Map<String, Object> map = new HashMap<String,Object>();
					map.put("accountNum", dto.getAccountNum());
					map.put("sub", sub);
					dao.subRepayment(map);
				}
				else {
					throw new CustomException("계좌에 잔액이 부족합니다.");
				}
			}
			else if(paymentRound == totalPaymentRounds-1) {
				// 회차증가
				paymentRound += 1;
				// 잔액
				int amountBalance = dto.getAmountBalance();
				// 이자 = 남은 원금 * 월 이자율
				interest = amountBalance * monthlyInterestRate;
				// 월 상환금 (월 이자 + 월 납입원금)
				repaymentMonth = (dto.getLoanAmount() * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPaymentRounds));
				// 납입원금
				repaymentAmount = repaymentMonth - interest;
				// 대출 잔액 업데이트(잔액-납입원금)
				amountBalance =0;
				// 계좌잔액이 월상환금보다 같거나 많으면
				if(accountNumBalance >= repaymentMonth) {
					dto.setRepaymentAmount(repaymentAmount);
					dto.setInterest(interest);
					dto.setRepaymentMonth(repaymentMonth);
					dto.setAmountBalance(amountBalance);
					dto.setPaymentRound(paymentRound);
					// 입출금통장-월상환금
					int sub = (int) (accountNumBalance-repaymentMonth);
					Map<String, Object> map = new HashMap<String,Object>();
					map.put("accountNum", dto.getAccountNum());
					map.put("sub", sub);
					dao.subRepayment(map);
				}
				else {
					throw new CustomException("계좌에 잔액이 부족합니다.");
				}
			}
			else {
				Map<String, Object> map = new HashMap<String,Object>();
				map.put("loanNum", dto.getLoanNum());
				map.put("payDate", dto.getPayDate());
				dao.accountState(map);
			}
		}
		else{
			System.out.println("원금균등상환");
			
			if(paymentRound < totalPaymentRounds-1) {
				// 회차증가
				paymentRound += 1;
				// 잔액
				int amountBalance = dto.getAmountBalance();
				// 월 납입원금
				repaymentAmount = dto.getLoanAmount() / totalPaymentRounds;
				// 이자
				interest = Math.round(amountBalance * monthlyInterestRate);
				// 월 상환금(이자+납입원금)
				repaymentMonth = interest + repaymentAmount;
				// 대출 잔액 업데이트(잔액-납입원금)
				amountBalance -= repaymentAmount;
				// 계좌잔액이 월상환금보다 같거나 많으면
				if(accountNumBalance >= repaymentMonth) {
					dto.setRepaymentAmount(repaymentAmount);
					dto.setInterest(interest);
					dto.setRepaymentMonth(repaymentMonth);
					dto.setAmountBalance(amountBalance);
					dto.setPaymentRound(paymentRound);
					// 입출금통장-월상환금
					int sub = (int) (accountNumBalance-repaymentMonth);
					Map<String, Object> map = new HashMap<String,Object>();
					map.put("accountNum", dto.getAccountNum());
					map.put("sub", sub);
					dao.subRepayment(map);
				}
				else {
					throw new CustomException("계좌에 잔액이 부족합니다.");
				}
			}
			else if(paymentRound == totalPaymentRounds-1) {
				// 회차증가
				paymentRound += 1;
				// 잔액
				int amountBalance = dto.getAmountBalance();
				// 월 납입원금
				repaymentAmount = dto.getLoanAmount() / totalPaymentRounds;
				// 이자
				interest = Math.round(amountBalance * monthlyInterestRate);
				// 월 상환금(이자+납입원금)
				repaymentMonth = interest + repaymentAmount;
				// 만약 마지막 회차라면 남은 잔액을 0으로 설정
				amountBalance = 0;
				// 계좌잔액이 월상환금보다 같거나 많으면
				if(accountNumBalance >= repaymentMonth) {
					dto.setRepaymentAmount(repaymentAmount);
					dto.setInterest(interest);
					dto.setRepaymentMonth(repaymentMonth);
					dto.setAmountBalance(amountBalance);
					dto.setPaymentRound(paymentRound);
					// 입출금통장-월상환금
					int sub = (int) (accountNumBalance-repaymentMonth);
					Map<String, Object> map = new HashMap<String,Object>();
					map.put("accountNum", dto.getAccountNum());
					map.put("sub", sub);
					dao.subRepayment(map);
				}
				else {
					throw new CustomException("계좌에 잔액이 부족합니다.");
				}
			}
			else {
				Map<String, Object> map = new HashMap<String,Object>();
				map.put("loanNum", dto.getLoanNum());
				map.put("payDate", dto.getPayDate());
				dao.accountState(map);
			}
		}
		System.out.println("dto 마지막 "+dto);
		return dao.updateRepayment(dto);
	}

	// 대출 상환하기
	@Override
	@Transactional
	public int endRepayment(LoanSignDTO dto) throws CustomException {
		// 입출금통장 잔액
		int accountNumBalance = dao.accountBalance(dto.getAccountNum());
		int loanBalance = dto.getLoanBalance();
		
		System.out.println("잔금 : " + loanBalance);
		// 총 상환금
		int totalRepayment = dto.getLoanBalance() + dto.getEarlyRepayment();
		System.out.println("총상환금" + totalRepayment);
		// 출금통장 잔액이 많으면
		if(totalRepayment <= accountNumBalance) {
			// repaymentDTO에 update
			int amountBalance = 0;
			Date payDate = dto.getLoanTermination();
			System.out.println("납부일=해지일" + dto.getLoanTermination());
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("amountBalance", amountBalance);
			map.put("payDate", payDate);
			map.put("loanNum", dto.getLoanNum());
			dao.lastUpdateRepayment(map);
			// signDTO에 update
			int loanRepayment = dto.getLoanAmount();
			Date loanTermination = dto.getLoanTermination();
			int earlyRepayment = dto.getEarlyRepayment();
			int loanNum = dto.getLoanNum();
			System.out.println("loanRepayment" + loanRepayment);
			System.out.println("loanTermination" + loanTermination);
			System.out.println("earlyRepayment"+earlyRepayment);
			System.out.println("loanNum"+loanNum);
			// 입출금통장-총상환금
			int sub = (int) (accountNumBalance-totalRepayment);
			Map<String, Object> map2 = new HashMap<String,Object>();
			map2.put("accountNum", dto.getAccountNum());
			map2.put("sub", sub);
			dao.subRepayment(map2);
		}
		else {
			throw new CustomException("계좌에 잔액이 부족합니다.");
		}
		return dao.endRepayment(dto);
	}

	

}
