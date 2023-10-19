package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.project_team.dto.AnswerDTO;
import com.example.project_team.dto.QuestionDTO;
import com.example.project_team.mappers.AnswerMapper;
import com.example.project_team.mappers.QuestionMapper;

@Service
public class QuestionServiceImpl implements QuestionService{

	@Autowired
	private QuestionMapper mapper;
	
	@Autowired
	private AnswerMapper mapper2;
	
	@Override
	public List<QuestionDTO> questionList(String id) throws ServletException, IOException {
		System.out.println("서비스 - questionList");
		List<QuestionDTO> dto =mapper.questionList(id);
		return dto;
	}

	@Override
	public int questionAdd(QuestionDTO dto) throws ServletException, IOException {
		System.out.println("서비스 - questionAdd");
		String title = dto.getTitle();
		String id = dto.getId();
		String content = dto.getContent();
		System.out.println(id +title +content);
		return mapper.questionAdd(dto);
	}

	@Override
	public List<QuestionDTO> allList() throws ServletException, IOException {
		System.out.println("서비스 - allList");
		return mapper.allList();
	}

	@Override
	public QuestionDTO fetchAnswer(int num) throws ServletException, IOException {
		System.out.println("서비스 - fetchAnswer");
		
		return mapper.fetchAnswer(num);
	}

	@Override
	public int answerAdd(AnswerDTO dto) throws ServletException, IOException {
		System.out.println("서비스 - answerAdd");
		int insertCnt = mapper.answerAdd(dto);
		if(insertCnt == 1) {
			System.out.println("service / 답변완료");
			mapper.answerChk(dto.getQuestionNum());
		}
		return insertCnt;
	}

	//관리자 답변 확인
	@Override
	public AnswerDTO commentConfirm(int num) throws ServletException, IOException {
		System.out.println("서비스 - commentConfirm");
		return mapper.commentConfirm(num);
	}

	

}
