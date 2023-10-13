package com.example.project_team.mappers;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.SignUpDTO;
import com.example.project_team.dto.UserDTO;
import com.example.project_team.entities.User;


@Mapper
public interface UserMapper {

	UserDTO toUserDTO(User user);
	
	User signUpToUser(SignUpDTO userDTO);
}