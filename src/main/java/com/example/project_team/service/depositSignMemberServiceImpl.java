package com.example.project_team.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.DepositDTO;
import com.example.project_team.dto.DepositSignDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.mappers.depositSignMemberMapper;
@Service
public class depositSignMemberServiceImpl implements depositSignMemberService{

	@Autowired
	private depositSignMemberMapper dao;
	
	// 상세정보
	@Override
	public DepositDTO selectDeposit(int yeNo) throws ServletException, IOException {
		System.out.println("depositSignMemberServiceImpl - selectDeposit");
		return dao.findByNum(yeNo);
	}

	@Override
	public List<AccountDTO> listAll(String id) throws ServletException, IOException {
		System.out.println("depositSignMemberServiceImpl - listAll");
		return dao.accountList(id);
	}

	@Override
	public int pwCheck(long accountNum, String id) throws ServletException, IOException {
		System.out.println("depositSignMemberServiceImpl - pwCheck");
		Map<String, Object> list = new HashMap<String, Object>();
		list.put("accountNum",accountNum);
		list.put("id",id);
		return dao.pwCheck(list);
	}

	@Override
	public int insertSign(DepositSignDTO dto) throws ServletException, IOException {
		System.out.println("depositSignMemberServiceImpl - insertSign");
		return dao.insertSign(dto);
	}

	@Override
	public List<DepositSignDTO> depositSignList(String id) throws ServletException, IOException {
		System.out.println("depositSignMemberServiceImpl - depositSignList");
		System.out.println("id"+id);
		return dao.depositSignList(id);
	}

	@Override
	@Transactional
	public void cancelDeposit(DepositSignDTO dto) throws CustomException {
		System.out.println("depositSignMemberServiceImpl - cancelDeposit");
		System.out.println("DTO" + dto);
		
		// deposit 계좌 update(상태-> 해지 / 금액-> 0원)
		dao.cancelDeposit(dto);
		
		// 계좌 잔액에 더하기
		int balance = dao.accountBalance(dto.getAccountNum());
		int total = dto.getYeAmount() + dto.getInterestTerm();
		int sumBalance = balance + total;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("accountNum", dto.getAccountNum());
		map.put("sumBalance", sumBalance);
		
		// 입출금통장에 금액 입금(수수료+원금)
		dao.inputMoney(map);
		
		
		
	}

	@Override
	public DepositSignDTO signList(int yeSignNo) throws ServletException, IOException {
		return dao.signList(yeSignNo);
	}

}
