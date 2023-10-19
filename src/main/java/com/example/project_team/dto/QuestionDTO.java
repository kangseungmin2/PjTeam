package com.example.project_team.dto;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_question")
@Data
public class QuestionDTO {
	
	@Id
	private int num;			//문의번호
	private String title;       //문의제목
	private String content;     //문의내용
	private String id;          //회원id fk
	private Date regDate;
	private String answerChk;
}
