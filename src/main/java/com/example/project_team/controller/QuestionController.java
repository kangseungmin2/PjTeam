package com.example.project_team.controller;
import java.io.IOException;

import java.util.List;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.AnswerDTO;
import com.example.project_team.dto.QuestionDTO;
import com.example.project_team.service.QuestionServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/question")
public class QuestionController {
	private static final Logger logger = LoggerFactory.getLogger(QuestionController.class);
	
	@Autowired
	private QuestionServiceImpl service;
	
	// List
	@GetMapping("/{id}")
	public List<QuestionDTO> questionList(@PathVariable("id") String id)
			throws ServletException, IOException {
		logger.info("<<< QuestionController - questionList() >>>");
		System.out.println("id"+id);
		List<QuestionDTO> dto = service.questionList(id);
		System.out.println("dto"+dto);
		return dto;
	}
	
	//insert
	@PostMapping()
	public int questionAdd(@RequestBody QuestionDTO dto)
			throws ServletException, IOException {
		logger.info("<<< QuestionController - questionAdd() >>>");

		return service.questionAdd(dto);
	}
	
	// 관리자) 1:1문의 전체 list
	@GetMapping()
	public List<QuestionDTO> allList()throws ServletException, IOException {
		logger.info("<<< QuestionController - allList() >>>");
		return service.allList();
	}
	
	// 관리자 문의 상세페이지
	@GetMapping("/y/{num}")
	public QuestionDTO fetchAnswer(@PathVariable("num") int num) throws ServletException, IOException {
		logger.info("<<< QuestionController - fetchAnswer() >>>");
		return service.fetchAnswer(num);
	}
	
	// 관리자 답변
	@PostMapping("/in")
	public int answerAdd(@RequestBody AnswerDTO dto) throws ServletException, IOException {
		logger.info("<<< QuestionController - answerAdd() >>>");
		
		return service.answerAdd(dto);
	}	
	
	// 관리자 댓글 확인
	@GetMapping("/ok/{questionNum}")
	public AnswerDTO commentConfirm(@PathVariable("questionNum") int questionNum) throws ServletException, IOException {
		logger.info("<<< QuestionController - commentConfirm() >>>");
		return service.commentConfirm(questionNum);
	}	
	
}

