package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.DepositDTO;

@Mapper
public interface depositAdminMapper {
	 
	public List<DepositDTO> DepositAdminList();
	public int insertDeposit(DepositDTO dto);
	public int updateDeposit(DepositDTO dto);
	public int deleteByNum(int num);
	public DepositDTO findByNum(int num);
}
