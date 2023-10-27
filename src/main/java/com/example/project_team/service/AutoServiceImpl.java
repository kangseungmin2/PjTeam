package com.example.project_team.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.AutoDTO;
import com.example.project_team.dto.TransferDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.mappers.AutoMapper;

@Service
public class AutoServiceImpl implements AutoService{
	
	@Autowired
	private AutoMapper mapper;
	
	@Autowired
	private AutoDTO dto;
	
	@Scheduled(cron = "0 * * * * ?")
    public void runTask() {
		 autoWithdrawal(dto);
        // 스케줄링 작업 수행
        System.out.println("Scheduled 실행");
    }
	
	// autolist
	@Override
	public List<AutoDTO> autoList(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("AutoServiceImpl - autoList");
		return mapper.autoList();
	}
	
	// autoDetail
	@Override
	public AutoDTO autoDetail(int autoNum) throws ServletException, IOException {
		System.out.println("AutoServiceImpl - autoDetail");
		return mapper.autoDetail(autoNum);
	}

	// autoAccount
	@Override
	public List<AccountDTO> autoAccount(String id) throws ServletException, IOException {
		System.out.println("AutoServiceImpl - autoAccount");
		return mapper.autoAccount(id);
	}
//	
//	// changeAuto
//	@Override
//	public AutoDTO changeAuto(int autoNum) throws ServletException, IOException {
//		System.out.println("AutoServiceImpl - changeAuto");
//		return mapper.changeAuto(autoNum);
//	}
//
	// autoWithdrawal
	@Override
	@Transactional
	public void autoWithdrawal(AutoDTO dto) 
		throws CustomException {
		System.out.println("AutoServiceImpl - autoWithdrawal");
		System.out.println("autoDate" + dto.getAutoDate());
		
		this.dto=dto;
		 // Date 객체 생성 (현재 날짜 및 시간)
        Date currentDate = new Date();

        // SimpleDateFormat을 사용하여 Date를 String으로 변환
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        
        String formattedDate = sdf.format(dto.getAutoDate());
        
        // 현재 날짜 가져오기
        LocalDate localdate = LocalDate.now();
        System.out.println("lo----" + localdate);
        
        if(localdate.toString().equals(formattedDate)) {
        	Map<String, Object> map = new HashMap<String, Object>();
    		// 출금금액
    		int out = 0;
    		map.put("accountNum", dto.getAccountNum()); // 출금계좌번호
    		map.put("autoAccount", dto.getAutoAccount()); // 보낼계좌번호
    		
    		// 수취인 해당 계좌 잔액
    		int balance = mapper.balanceChk(map);
    		// 출금계좌 잔액
    		int mBalance = mapper.mBalanceChk(map);
    		// 계좌잔액 >= 이체금액
    		if (mBalance >= dto.getAutoAmount()) {
    			// 일일이체한도 초과여부 체크 부분 => 보류
    			
    			
    			// 계좌잔액 - 이체금액
    			out = mBalance - dto.getAutoAmount();
    			
    			map.put("out", out); // 빠질금액(out)
    			// 이체한도 <= 이체금액
    			if (dto.getAccountLimit() >= dto.getAutoAmount()) {
    				// 금액 빠져나감
    				mapper.outAuto(map);
    			}
    			else {
    				throw new CustomException("일일 이체한도가 초과 되었습니다.");
    			}
    		}
    		else {
    			throw new CustomException("계좌에 잔액이 부족합니다.");
    		}
    		
    		// 수취인 입금
    		int in = balance + dto.getAutoAmount();
    		// 입금금액(in)
    		map.put("in", in);
    		// 계좌번호(dto.getTrAccountNum())
    		map.put("autoAccount", dto.getAutoAccount());
    		mapper.insertAuto(map);
    		
    		// 이체 목록에 추가
    		int insertCnt = mapper.addAutoList(dto);
    		if (insertCnt == 0) {
    			throw new CustomException("서버오류 - 거래진행 중단");
    		}
    		
//    		int num = Integer.valueOf(spdata[1])+ 1; 
//	        spdata[1] = String.valueOf(num);
    		// 정상거래 성공 시 한달 간격으로 자동이체 출금됨
    		LocalDate nextAutoDate = localdate.plusMonths(1);
            dto.setAutoDate(java.sql.Date.valueOf(nextAutoDate));
            System.out.println("거래 성공(o゜▽゜)o☆(o゜▽゜)o☆");	
//          System.out.println("dddssssss"+dto.getAutoDate());
            
        }
		
	}

	// changeAuto
	@Override
	public AutoDTO changeAuto(int autoNum) throws ServletException, IOException {
		System.out.println("AutoServiceImpl - autoAccount");
		return mapper.changeAuto(autoNum);
	}

	
	// alterAutoDate
	@Override
	public AutoDTO alterAutoDate(int autoNum) throws ServletException, IOException {
		System.out.println("AutoServiceImpl - alterAutoDate");
		
		return mapper.alterAutoDateList(autoNum);
	}
	
	
	
	
}
