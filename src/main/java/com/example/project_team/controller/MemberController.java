package com.example.project_team.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.UserDTO;
import com.example.project_team.entities.User;
import com.example.project_team.service.MemberService;


@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/member")
public class MemberController {

	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MemberService service;
	
	@GetMapping("/{id}")
	public User memberInfo(@PathVariable String id) 
			throws ServletException, IOException{
		logger.info("controller - memberInfo");
		
		return service.memberInfo(id);
	}
	
	@PutMapping()
	public int memberEdit(@RequestBody User dto)
			throws ServletException, IOException{
		logger.info("controller - memberEdit");
		
		return service.memberEdit(dto);
	}
	
	//회원관리
	@GetMapping("/management")
	public List<UserDTO> management() 
		throws ServletException, IOException{
		System.out.println("controller - management");
		logger.info("controller - management");	
		return service.management();
	}
	
	@DeleteMapping("/{id}")
	public int memberDelete(@PathVariable String id) 
			throws ServletException, IOException{
		System.out.println("controller - management");
		return service.memberDelete(id);
		
	}
	
}
