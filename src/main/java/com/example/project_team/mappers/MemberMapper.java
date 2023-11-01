package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.UserDTO;
import com.example.project_team.entities.User;

@Mapper
public interface MemberMapper{

	public User memberInfo(String id);
	
	public int memberEdit(User dto);
	
	public List<UserDTO> management();
	
	public int memberDelete(String id);
}
