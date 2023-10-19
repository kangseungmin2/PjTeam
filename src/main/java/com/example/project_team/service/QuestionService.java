package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import com.example.project_team.dto.AnswerDTO;
import com.example.project_team.dto.QuestionDTO;

public interface QuestionService {
	//고객 아이디별 list
	public List<QuestionDTO> questionList(String id)
			throws ServletException, IOException;
	//고객 insert
	public int questionAdd(QuestionDTO dto) 
			throws ServletException, IOException;
	
	//관리자 전체 list
	public List<QuestionDTO> allList()
			throws ServletException, IOException;
	
	//관리자 문의 상세페이지
	public QuestionDTO fetchAnswer(int num) 
			throws ServletException, IOException;
	
	//관리자 답변
	public int answerAdd(AnswerDTO dto)
			throws ServletException, IOException;
	
	//관리자 답변 확인
	public AnswerDTO commentConfirm(int num)
			throws ServletException, IOException;
}
