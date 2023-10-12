package com.example.project_team.service;

import java.util.List;


import com.example.project_team.dto.BoardDTO;

public interface BoardService {
	
	public List<BoardDTO> listAll();
	
	public void insertBoard(BoardDTO dto);
	
	public void deleteBoard(int num);
	
	public BoardDTO selectBoard(int num);
	

}
