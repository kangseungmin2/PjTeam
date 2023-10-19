package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.AutoDTO;

@Mapper
public interface AutoMapper {
	
	public List<AutoDTO> autoList();

}
