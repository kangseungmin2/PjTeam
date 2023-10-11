package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.BoardDTO;
import com.example.project_team.mappers.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardMapper dao;
	
	@Override
	public List<BoardDTO> listAll(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("BoardServiceImpl - listAll");
		List<BoardDTO> list = dao.boardList();
		return list;
	}

	@Override
	public int insertBoard(BoardDTO dto) throws ServletException, IOException {
		System.out.println("BoardServiceImpl - insertBoard");
		int insertCnt = dao.insertBoard(dto);
		return insertCnt;
	}

	@Override
	public int updateBoard(BoardDTO dto) throws ServletException, IOException {
		System.out.println("BoardServiceImpl - updateBoard");
		int updateCnt = dao.updateBoard(dto);
		return updateCnt;
	}

	@Override
	public int deleteBoard(int num) throws ServletException, IOException {
		System.out.println("BoardServiceImpl - deleteBoard");
		int deleteCnt = dao.deleteByNum(num);
		return deleteCnt;
	}

	@Override
	public BoardDTO selectBoard(int num) throws ServletException, IOException {
		System.out.println("BoardServiceImpl - selectBoard");
		BoardDTO dto = dao.findByNum(num);
		return dto;
	}

}
