package com.example.project_team.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.AutoSignDTO;
import com.example.project_team.dto.SavingsDTO;
import com.example.project_team.dto.SavingsSignDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.mappers.savingsSignMemberMapper;
@Service
public class savingsSignMemberServiceImpl implements savingsSignMemberService{
	
	@Autowired
	private savingsSignMemberMapper dao;
	
//	@Autowired
//	private AutoSignDTO dto;
	
	
//	@Scheduled(cron = "0 * * * * ?")
//    public void runTask() {
//		autoRepayment(dto);
//        // 스케줄링 작업 수행
//        System.out.println("Scheduled 실행");
//    }
	
	
	// 상세정보
	@Override
	public SavingsDTO selectSavings(int juckNo) throws ServletException, IOException {
		System.out.println("savingsSignMemberServiceImpl - selectSavings");
		return dao.findByNum(juckNo);
	}

	@Override
	public List<AccountDTO> listAll(String id) throws ServletException, IOException {
		System.out.println("savingsSignMemberServiceImpl - listAll");
		return dao.accountList(id);
	}

	@Override
	public int pwCheck(long accountNum, String id) throws ServletException, IOException {
		System.out.println("savingsSignMemberServiceImpl - pwCheck");
		Map<String, Object> list = new HashMap<String, Object>();
		list.put("accountNum",accountNum);
		list.put("id",id);
		return dao.pwCheck(list);
	}

	@Override
	public int insertSign(SavingsSignDTO dto) throws ServletException, IOException {
		System.out.println("savingsSignMemberServiceImpl - insertSign");
		return dao.insertSign(dto);
	}

	@Override
	public List<SavingsSignDTO> savingsSignList(String id) throws ServletException, IOException {
		System.out.println("savingsSignMemberServiceImpl - savingsSignList");
		System.out.println("id"+id);
		return dao.savingsSignList(id);
	}

	@Override
	@Transactional
	public void cancelSavings(SavingsSignDTO dto) throws CustomException {
		System.out.println("savingsSignMemberServiceImpl - cancelSavings");
		System.out.println("DTO" + dto);
		
		// deposit 계좌 update(상태-> 해지 / 금액-> 0원)
		dao.cancelSavings(dto);
		
		// 계좌 잔액에 더하기
		int balance = dao.accountBalance(dto.getAccountNum());
		int total = dto.getJuckAmount() + dto.getInterestTerm();
		int sumBalance = balance + total;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("accountNum", dto.getAccountNum());
		map.put("sumBalance", sumBalance);
		
		// 입출금통장에 금액 입금(수수료+원금)
		dao.inputMoney(map);
	}

	@Override
	public SavingsSignDTO signList(int juckSignNo) throws ServletException, IOException {
		return dao.signList(juckSignNo);
	}

	@Override
	@Transactional
	public void updateRepayment(SavingsSignDTO dto) throws CustomException {
		
		int balance = dao.accountBalance(dto.getAccountNum());
		if(balance >= dto.getJuckAmount()) {
			int sub = balance - dto.getJuckAmount();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("accountNum", dto.getAccountNum());
			map.put("sub", sub);
			dao.subMoney(map);
			
			int juckBalance = dto.getJuckBalance();
			int sumBalance = dto.getJuckAmount()+ juckBalance;
			int juckSignNo = dto.getJuckSignNo();
			int round = dto.getJuckRound();
			int plusRound = round+1;
			Map<String, Object> map1 = new HashMap<String, Object>();
			map1.put("juckSignNo", juckSignNo);
			map1.put("sumBalance", sumBalance);
			map1.put("plusRound", plusRound);
			
			dao.plusMoney(map1);
		}else {
			throw new CustomException("잔액이 부족합니다.");
		}
		
		
		
	}
	
//	@Override
//	@Transactional
//	public void autoRepayment(AutoSignDTO dto) throws CustomException {
//		this.dto=dto;
//		
//		// Date 객체 생성 (현재 날짜 및 시간)
//        Date currentDate = new Date();
//
//        // SimpleDateFormat을 사용하여 Date를 String으로 변환
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//        
//        String formattedDate = sdf.format(dto.getJuckAutoDate());
//        
//        // 현재 날짜 가져오기
//        LocalDate localdate = LocalDate.now();
//        
//        if(localdate.toString().equals(formattedDate)) {
//        
//			// 입출금통장 잔액 비교(돈 많으면 이체/없으면 실패)
//			int balance = dao.accountBalance(dto.getAccountNum());
//			if(balance >= dto.getJuckAmount()) {
//				int sub = balance - dto.getJuckAmount();
//				Map<String, Object> map = new HashMap<String, Object>();
//				map.put("accountNum", dto.getAccountNum());
//				map.put("sub", sub);
//				dao.subMoney(map);
//				
//				// 적금계좌에 balance에 추가
//				int juckBalance = dto.getJuckBalance();
//				int sumBalance = dto.getJuckAmount()+ juckBalance;
//				int juckSignNo = dto.getJuckSignNo();
//				int round = dto.getJuckRound();
//				int plusRound = round+1;
//				Map<String, Object> map1 = new HashMap<String, Object>();
//				map1.put("juckSignNo", juckSignNo);
//				map1.put("sumBalance", sumBalance);
//				map1.put("plusRound", plusRound);
//				
//				
//				
//				dao.plusMoney(map1);
//			}
//			
//			
//			// 정상거래 성공 시 한달 간격으로 자동이체 출금됨
//    		LocalDate nextAutoDate = localdate.plusMonths(1);
//            dto.setJuckAutoDate(java.sql.Date.valueOf(nextAutoDate));
//            System.out.println("거래 성공(o゜▽゜)o☆(o゜▽゜)o☆");
//       }
//		
//		
//	}

}
