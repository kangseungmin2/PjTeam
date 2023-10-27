package com.example.project_team.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.DepositDTO;
import com.example.project_team.dto.DepositSignDTO;
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

}
