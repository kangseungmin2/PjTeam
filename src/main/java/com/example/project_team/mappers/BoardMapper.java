package com.example.project_team.mappers;


import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project_team.dto.BoardDTO;

@Mapper
public interface BoardMapper extends JpaRepository<BoardDTO, Integer> {

}
