package com.example.project_team.mappers;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.AdminDTO;
import com.example.project_team.dto.AdminSignUpDTO;
import com.example.project_team.dto.SignUpDTO;
import com.example.project_team.dto.UserDTO;
import com.example.project_team.entities.Admin;
import com.example.project_team.entities.User;


@Mapper
public interface UserMapper {

	UserDTO toUserDTO(User user);
	
	User signUpToUser(SignUpDTO userDTO);
	
	AdminDTO toAdminDTO(Admin admin);
	
	Admin AdminsignUpToUser(AdminSignUpDTO userDTO);
}