package com.example.project_team.mappers;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project_team.dto.AnswerDTO;

@Mapper
public interface AnswerMapper extends JpaRepository<AnswerDTO, Integer>{

}
