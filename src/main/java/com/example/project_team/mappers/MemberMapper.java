package com.example.project_team.mappers;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.entities.User;

@Mapper
public interface MemberMapper{

	public User memberInfo(String id);
	
	public int memberEdit(User dto);
}
