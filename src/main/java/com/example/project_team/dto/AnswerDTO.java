package com.example.project_team.dto;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="team_comment")
@Data
public class AnswerDTO {
	@Id
    private int commentNum;     //댓글 일련번호
    private int num;    //게시글 번호
    private String id;          //작성자(관리자)
    private String content;     //글내용
    private Timestamp regDate;
}
