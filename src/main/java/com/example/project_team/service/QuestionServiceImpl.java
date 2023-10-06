//package com.example.project_team.service;
//
//import java.io.IOException;
//import java.util.List;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.ui.Model;
//
//import com.example.project_team.dto.QuestionDTO;
//import com.example.project_team.mappers.QuestionMapper;
//
//
//@Service
//public class QuestionServiceImpl implements QuestionService{
//
//	@Autowired
//	private QuestionMapper mapper;
//	
//	@Override
//	public List<QuestionDTO> questionList(HttpServletRequest req, Model model) throws ServletException, IOException {
//		System.out.println("서비스 - questionList");
//		return mapper.questionList();
//	}

//}
