package com.example.project_team.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.project_team.dto.QuestionDTO;

public interface QuestionService {
	public List<QuestionDTO> questionList(HttpServletRequest req, Model model)
			throws ServletException, IOException;
}
