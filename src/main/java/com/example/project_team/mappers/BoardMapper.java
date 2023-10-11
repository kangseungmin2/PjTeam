package com.example.project_team.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.project_team.dto.BoardDTO;

@Mapper
public interface BoardMapper {

	public List<BoardDTO> boardList();
	public int insertBoard(BoardDTO dto);
	public int updateBoard(BoardDTO dto);
	public int deleteByNum(int num);
	public BoardDTO findByNum(int num);
}
