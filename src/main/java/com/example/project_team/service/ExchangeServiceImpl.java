package com.example.project_team.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.ExchangeDTO;
import com.example.project_team.dto.ExchangeListDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.mappers.AccountMapper;
import com.example.project_team.mappers.ExchangeMapper;

@Service
public class ExchangeServiceImpl implements ExchangeService{

	@Autowired
	private ExchangeMapper mapper;
	
	@Autowired
	private AccountMapper accountMapper;
	@Override
	public List<ExchangeDTO> exchangeList() {
		System.out.println("service - exhangeList");
		List<ExchangeDTO> dto = mapper.exchangeList();
		System.out.println("dto"+dto);
		return mapper.exchangeList();
	}

	//환전 신청
	@Override
	@Transactional
	public void exchangeInsert(ExchangeListDTO dto) throws CustomException{
		System.out.println("service - exchangeInsert");
		
		// 환전 신청
		mapper.exchangeInsert(dto);
		
		AccountDTO account = accountMapper.fetchAccountByNum(dto.getAccountNum());
		
		int result = 0;
		if(account.getBalance() >= dto.getTprice()) {
			result = (int) (account.getBalance() - dto.getTprice());
		}
		else {
			throw new CustomException("잔액이 부족합니다.");
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("accountNum", dto.getAccountNum());
		map.put("balance", result);
		
		int updateCnt = mapper.saveAccount(map);
		if( updateCnt != 1) {
			throw new CustomException("계좌 업데이트 실패"); // 업데이트 실패 시 롤백
		}
	}

	@Override
	public List<ExchangeListDTO> myList(String id) {
		System.out.println("service - myList");
		
		return mapper.myList(id);
	}

	@Override
	public List<ExchangeListDTO> allList() {
		System.out.println("service - allList");
		return mapper.allList();
	}
	
	@Override
	public ExchangeListDTO detailNum(int changeNum) {
		System.out.println("service - detailNum");
		
		return mapper.detailNum(changeNum);
	}

	@Override
	public int changeSuccess(int changeNum) {
		System.out.println("service - changeSuccess");
		
		return mapper.changeSuccess(changeNum);
	}

	@Override
	public int changeFail(int changeNum) {
		System.out.println("service - changeFail");
		
		return mapper.changeFail(changeNum);
	}



	
	
}
