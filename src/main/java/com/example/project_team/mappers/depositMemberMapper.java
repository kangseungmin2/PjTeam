package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.DepositDTO;

@Mapper
public interface depositMemberMapper {
 
	public List<DepositDTO> DepositMemberList();
	public DepositDTO findByNum(int num);
}
