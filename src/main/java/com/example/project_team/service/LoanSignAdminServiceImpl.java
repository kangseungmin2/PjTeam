package com.example.project_team.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.CalRepaymentDTO;
import com.example.project_team.dto.LoanSignDTO;
import com.example.project_team.mappers.LoanSignAdminMapper;

@Service
public class LoanSignAdminServiceImpl implements LoanSignAdminService {

	@Autowired
	private LoanSignAdminMapper dao;

	// 대출 신청 목록
	@Override
	public List<LoanSignDTO> listAll(HttpServletRequest req, Model model) throws ServletException, IOException {
		return dao.signList();
	}

	// 1건
	@Override
	public LoanSignDTO selectSign(int loanNum) throws ServletException, IOException {
		System.out.println("LoanSignAdminServiceImpl - selectLoan");
		return dao.findByNum(loanNum);
	}

	// 승인
	@Override
	public int signSuccess(LoanSignDTO dto) throws ServletException, IOException {
		return dao.signSuccess(dto);
	}

	// 대출계산
	@Override
	public ArrayList<Map<String, Object>> repayment(int loanNum)
			throws ServletException, IOException {
		System.out.println("대출계산 서비스 타는가!");
		System.out.println("dto로 출력되는가");
		LoanSignDTO dto = dao.findByNum(loanNum);
		System.out.println("대출번호 : " + dto.getLoanNum());
		System.out.println("대출원금 : " + dto.getLoanAmount());
		System.out.println("금리 : " + dto.getInterestRate());
		System.out.println("대출기간 : " + dto.getLoanPeriod());
		System.out.println("상환방법 : " + dto.getRepayment());
		// 스케줄 list생성
		ArrayList<Map<String, Object>> list = null;
		
		// 월 금리
		double monthlyInterestRate = (double)dto.getInterestRate() / 12 / 100;
		// 상환회차
		int paymentRound = 0;				
		// 총 상환 회차
		int totalPaymentRounds = dto.getLoanPeriod() * 12;
		System.out.println("총기간 : "+ totalPaymentRounds);
		// 월 상환금
		double repaymentMonth = 0;
		// 이자
		double interest = 0;
		// 납입원금
		double repaymentAmount = 0;

		if("만기일시상환".equals(dto.getRepayment())) {
			System.out.println("만기일시상환");
			// 최초 잔액 : 대출원금
			int amountBalance = dto.getLoanAmount();
			
			// 리스트 생성
			list = new ArrayList<Map<String, Object>>();
			for (int i = 0; i < totalPaymentRounds; i++) {
				// 맵 생성
				Map<String, Object> map = new HashMap<String, Object>();
				// 이자
				interest = dto.getLoanAmount() * monthlyInterestRate;
				System.out.println("월금리"+monthlyInterestRate);
				System.out.println("원금"+dto.getLoanAmount() );
				// 납입원금
				repaymentAmount = 0;
				// 월 상환금
				repaymentMonth = interest + repaymentAmount;
				// 대출 잔액 업데이트(잔액-납입원금)
				amountBalance -= repaymentAmount;
				if (i == totalPaymentRounds - 1) {
					// 대출 기간이 끝났을 때, 대출원금 납부
					repaymentAmount = amountBalance;
					amountBalance = 0;
				}
				// 스케줄에 추가
				map.put("paymentRound", i+1);
				map.put("repaymentMonth", repaymentMonth);
				map.put("interest", interest);
				map.put("repaymentAmount", repaymentAmount);
				map.put("amountBalance", amountBalance);
				// list에 회차정보 담기
				list.add(map);
				System.out.println("만기일시map : " + map);
				paymentRound += 1;

				System.out.println("횟수 : " + paymentRound);
				System.out.println("이자 : " + interest);
				System.out.println("납입원금 : " + repaymentAmount);
				System.out.println("월상환금 : " + repaymentMonth);
				System.out.println("잔액 : " + amountBalance);
			}
		}
		else if("원리금균등상환".equals(dto.getRepayment())) {
			System.out.println("원리금균등상환");
			// 최초 잔액 : 대출원금
			int amountBalance = dto.getLoanAmount();
			// 리스트 생성
			list = new ArrayList<Map<String, Object>>();
			for (int i = 0; i < totalPaymentRounds; i++) {
				// 맵 생성
				Map<String, Object> map = new HashMap<String, Object>();
				// 이자 = 남은 원금 * 월 이자율
				interest = (double) Math.round(amountBalance * monthlyInterestRate);
				// 월 상환금 (월 이자 + 월 납입원금)
				repaymentMonth = (double) Math.round((dto.getLoanAmount() * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPaymentRounds)));
				// 납입원금
				repaymentAmount = repaymentMonth - interest;
				// 대출 잔액 업데이트(잔액-납입원금)
				amountBalance -= repaymentAmount;
				if (i == totalPaymentRounds - 1) {
					// 대출 기간이 끝났을 때 0으로
					amountBalance = 0;
				}
				// 스케줄에 추가
				map.put("paymentRound", i+1);
				map.put("repaymentMonth", repaymentMonth);
				map.put("interest", interest);
				map.put("repaymentAmount", repaymentAmount);
				map.put("amountBalance", amountBalance);
				// list에 회차정보 담기
				list.add(map);
				System.out.println("원리금균등상환map : " + map);
				paymentRound += 1;
				System.out.println("횟수 : " + paymentRound);
				System.out.println("이자 : " + interest);
				System.out.println("납입원금 : " + repaymentAmount);
				System.out.println("월상환금 : " + repaymentMonth);
				System.out.println("잔액 : " + amountBalance);
			}
		}
		else{
			System.out.println("원금균등상환");
			int amountBalance = dto.getLoanAmount();
			System.out.println("1차 처음잔액 : " + amountBalance);
			// 월 납입원금
			repaymentAmount = dto.getLoanAmount() / totalPaymentRounds;
			// 리스트 생성
			list = new ArrayList<Map<String, Object>>();
			for(int i = 1; i <= totalPaymentRounds; i++) {
				// 맵 생성
				Map<String, Object> map = new HashMap<String, Object>();
				// 이자
				interest = Math.round(amountBalance * monthlyInterestRate);
				// 월 상환금(이자+납입원금)
				repaymentMonth = interest + repaymentAmount;
				// 대출 잔액 업데이트(잔액-납입원금)
				amountBalance -= repaymentAmount;
				// 만약 마지막 회차라면 남은 잔액을 0으로 설정
				if (i == totalPaymentRounds) {
					amountBalance = 0;
				}
				// 스케줄에 추가
				map.put("paymentRound", i+1);
				map.put("repaymentMonth", repaymentMonth);
				map.put("interest", interest);
				map.put("repaymentAmount", repaymentAmount);
				map.put("amountBalance", amountBalance);
				// list에 회차정보 담기
				list.add(map);
				System.out.println("원금균등상환map : " + map);
				
				paymentRound += 1;
				System.out.println("횟수 : " + paymentRound);
				System.out.println("이자 : " + interest);
				System.out.println("납입원금 : " + repaymentAmount);
				System.out.println("월상환금 : " + repaymentMonth);
				System.out.println("잔액 : " + amountBalance);
			}
		}
		return list;
	}

	// repayment테이블 insert
	@Override
	public int insertRepayment(CalRepaymentDTO dto) throws ServletException, IOException {
		System.out.println("처음dto"+dto);
		System.out.println("LoanSignAdminServiceImpl - insertRepayment");

		// 월 금리
		double monthlyInterestRate = (double)dto.getInterestRate() / 12 / 100;
		// 상환회차
		int paymentRound = 0;				
		// 총 상환 회차
		int totalPaymentRounds = dto.getLoanPeriod() * 12;
		System.out.println("총기간 : "+ totalPaymentRounds);
		// 월 상환금
		double repaymentMonth = 0;
		// 이자
		double interest = 0;
		// 납입원금
		double repaymentAmount = 0;

		if("만기일시상환".equals(dto.getRepayment())) {
			System.out.println("만기일시상환");
			// 최초 잔액 : 대출원금
			int amountBalance = dto.getLoanAmount();
			// 이자
			interest = dto.getLoanAmount() * monthlyInterestRate;
			// 납입원금
			repaymentAmount = 0;
			// 월 상환금
			repaymentMonth = interest + repaymentAmount;
			// 대출 잔액 업데이트(잔액-납입원금)
			amountBalance -= repaymentAmount;
			paymentRound += 1;
			System.out.println("횟수 : " + paymentRound);
			System.out.println("이자 : " + interest);
			System.out.println("납입원금 : " + repaymentAmount);
			System.out.println("월상환금 : " + repaymentMonth);
			System.out.println("잔액 : " + amountBalance);
			dto.setRepaymentAmount(repaymentAmount);
			dto.setInterest(interest);
			dto.setRepaymentMonth(repaymentMonth);
			dto.setAmountBalance(amountBalance);
			dto.setPaymentRound(paymentRound);
		}
		else if("원리금균등상환".equals(dto.getRepayment())) {
			System.out.println("원리금균등상환");
			// 최초 잔액 : 대출원금
			int amountBalance = dto.getLoanAmount();;
			// 이자 = 남은 원금 * 월 이자율
			interest = amountBalance * monthlyInterestRate;
			// 월 상환금 (월 이자 + 월 납입원금)
			repaymentMonth = (dto.getLoanAmount() * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPaymentRounds));
			// 납입원금
			repaymentAmount = repaymentMonth - interest;
			// 대출 잔액 업데이트(잔액-납입원금)
			amountBalance -= repaymentAmount;
			paymentRound += 1;
			System.out.println("횟수 : " + paymentRound);
			System.out.println("이자 : " + interest);
			System.out.println("납입원금 : " + repaymentAmount);
			System.out.println("월상환금 : " + repaymentMonth);
			System.out.println("잔액 : " + amountBalance);
			dto.setRepaymentAmount(repaymentAmount);
			dto.setInterest(interest);
			dto.setRepaymentMonth(repaymentMonth);
			dto.setAmountBalance(amountBalance);
			dto.setPaymentRound(paymentRound);
		}
		else{
			System.out.println("원금균등상환");
			int amountBalance = dto.getLoanAmount();
			System.out.println("1차 처음잔액 : " + amountBalance);
			// 월 납입원금
			repaymentAmount = dto.getLoanAmount() / totalPaymentRounds;

			// 이자
			interest = Math.round(amountBalance * monthlyInterestRate);
			// 월 상환금(이자+납입원금)
			repaymentMonth = interest + repaymentAmount;
			// 대출 잔액 업데이트(잔액-납입원금)
			amountBalance -= repaymentAmount;
			paymentRound += 1;
			System.out.println("횟수 : " + paymentRound);
			System.out.println("이자 : " + interest);
			System.out.println("납입원금 : " + repaymentAmount);
			System.out.println("월상환금 : " + repaymentMonth);
			System.out.println("잔액 : " + amountBalance);
			dto.setRepaymentAmount(repaymentAmount);
			dto.setInterest(interest);
			dto.setRepaymentMonth(repaymentMonth);
			dto.setAmountBalance(amountBalance);
			dto.setPaymentRound(paymentRound);
		}
		System.out.println("dto 마지막 "+dto);
		return dao.insertRepayment(dto);
	}



	// 반려
	@Override
	public int signFail(LoanSignDTO dto) throws ServletException, IOException {
		return dao.signFail(dto);
	}




}
