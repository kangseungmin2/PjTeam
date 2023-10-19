package com.example.project_team.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.UtilityDTO;
import com.example.project_team.service.UtilityService;


@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/utilityList")
@RestController
public class UtilityController {

	@Autowired
	private UtilityService service;
	
//	//계좌추가
//	@PostMapping
//	public Map<String,Object> accountOpening(@RequestBody AccountDTO dto) {
//		System.out.println("<<<AccountController - accountOpening>>>");
//		int insertCnt = 0;
//		String resultCode="";
//		String resultMsg="";
//		Map<String,Object> map = new HashMap<String,Object>();
//		try {
//			System.out.println("dto:"+dto);
//			insertCnt = service.insertAccount(dto);
//			if(insertCnt == 1) {
//				resultCode = "200";
//				resultMsg ="성공";
//			}
//		}catch(Exception e) {
//			resultCode= "400";
//			resultMsg ="실패";
//		}
//		map.put("resultCode", resultCode);
//		map.put("resultMsg", resultMsg);
//		return map;
//	}
	//전체 리스트
	@GetMapping("/{id}")
	public List<UtilityDTO> utilityList(@PathVariable("id") String id) 
		throws ServletException, IOException{
		System.out.println("UtilityController - utilityList");
		return service.utilityList(id);
	}
	

}
