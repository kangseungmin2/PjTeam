package com.example.project_team.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.BoardDTO;
import com.example.project_team.mappers.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardMapper dao;

	@Override
	public List<BoardDTO> listAll() {
		return dao.findAll();
	}

	@Override
	public void insertBoard(BoardDTO dto) {
		dao.save(dto);
	}

	@Override
	public void deleteBoard(int num) {
		dao.deleteById(num);;
	}

	@Override
	public BoardDTO selectBoard(int num) {
		return dao.findById(num).get();
	}

}
