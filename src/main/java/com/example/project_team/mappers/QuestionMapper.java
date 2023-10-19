package com.example.project_team.mappers;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.project_team.dto.AnswerDTO;
import com.example.project_team.dto.QuestionDTO;

@Mapper
public interface QuestionMapper {

	//id별 전체 list 조회
	public List<QuestionDTO> questionList(String id);
	
	//insert
	public int questionAdd(QuestionDTO dto);
	
	//관리자 전체 list
	public List<QuestionDTO> allList();
	
	//관리자 문의 상세페이지
	public QuestionDTO fetchAnswer(int num);
	
	//관리자 답변
	public int answerAdd(AnswerDTO dto);
	
	//관리자 답변 확인
	public AnswerDTO commentConfirm(int num);
	
	//답변완료 업데이트
	public int answerChk(int num);
	
}
