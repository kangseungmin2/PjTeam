package com.example.project_team.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.BoardDTO;
import com.example.project_team.service.BoardService;


@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/boardList")
public class BoardController {
	
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@Autowired
	private BoardService service;
	
	// List
	@GetMapping
	public List<BoardDTO> boardList(HttpServletRequest req, Model model)
		throws ServletException, IOException {
		logger.info("<<< BoardController - boardList() >>>");
		
		return service.listAll();
	}
	
	// Insert
	@PostMapping
	public Map<String, Object> boardInsert(@RequestBody BoardDTO dto)
		throws ServletException, IOException {
		logger.info("<<< BoardController - boardInsert() >>>");
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			service.insertBoard(dto);
			resultCode="333";
			resultMsg="boardInsert success♥️";
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="444";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		
		System.out.println("[boardInsert 성공!]");
		return map;
	}
	
	// 1건 select
	@GetMapping("/{num}")
	public BoardDTO fetchBoardByNum(@PathVariable int num)
		throws ServletException, IOException {
		logger.info("<<< BoardController - fetchBoardByNum() >>>");
		return service.selectBoard(num);
	}
	
	// Update
	@PutMapping("/{num}")
	public Map<String, Object> boardUpdate(@PathVariable int num, @RequestBody BoardDTO dto)
		throws ServletException, IOException {
		logger.info("<<< BoardController - boardUpdate() >>>");
		
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			service.insertBoard(dto);
			resultCode="333";
			resultMsg="boardUpdate success♥️";
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="444";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		
		System.out.println("[boardUpdate 성공!]");
		return map;
	}
	
	// Delete
	@DeleteMapping("/{num}")
	public Map<String, Object> boardDelete(@PathVariable int num)
		throws ServletException, IOException {
		logger.info("<<< BoardController - boardDelete() >>>");
		
		String resultCode="";
		String resultMsg="";
		
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			service.deleteBoard(num);
			resultCode="333";
			resultMsg="boardDelete success♥️";
		} catch(Exception e) {
			e.printStackTrace();
			resultCode="444";
			resultMsg=e.getMessage();
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		
		System.out.println("[boardDelete 성공!]");
		return map;
	}
}
