package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.BoardDTO;

public interface BoardService {

	public List<BoardDTO> listAll(HttpServletRequest req, Model model)
		throws ServletException, IOException;
	
	public int insertBoard(BoardDTO dto)
		throws ServletException, IOException;
	
	public int updateBoard(BoardDTO dto)
		throws ServletException, IOException;
	
	public int deleteBoard(int num)
		throws ServletException, IOException;
	
	public BoardDTO selectBoard(int num)
		throws ServletException, IOException;
}
