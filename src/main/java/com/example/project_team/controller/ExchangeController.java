package com.example.project_team.controller;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.ExchangeDTO;
import com.example.project_team.dto.ExchangeListDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.exceptionHandler.ErrorResponse;
import com.example.project_team.service.ExchangeService;

@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/exchange")
@RestController
public class ExchangeController {

	 private static final Logger logger = LoggerFactory.getLogger(ExchangeController.class);
	@Autowired
	private ExchangeService service;
	
	@GetMapping
	public List<ExchangeDTO> exchangList()
			throws ServletException, IOException{
		System.out.println("controller - exchangeList");
		List<ExchangeDTO> dto2 = service.exchangeList();
		System.out.println("dto2 "+dto2);
		return dto2;
	}
	
	//환전 신청
	@PostMapping
	public ResponseEntity<ErrorResponse> exchangeInsert(@RequestBody ExchangeListDTO dto) 
			throws ServletException, IOException{
		logger.info("price"+dto.getRprice(),dto.getTprice());
		System.out.println("controller -exchangeInsert");
		System.out.println("rPrice"+dto.getRprice());
		System.out.println("tPrice"+dto.getTprice());
		try {
			System.out.println("dto:"+dto);
			service.exchangeInsert(dto);
			return ResponseEntity.ok(new ErrorResponse(true, "환율 신청이 되었습니다."));
		
		}catch(CustomException ex) {
			return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
		}

	}
	
	@GetMapping("/my/{id}")
	public List<ExchangeListDTO> myList(@PathVariable("id") String id)
			throws ServletException, IOException{
		System.out.println("controller - myList"+id);
		List<ExchangeListDTO> dto = service.myList(id);
		System.out.println("dto"+dto);
		return dto;
	}
	
	@GetMapping("/all")
	public List<ExchangeListDTO> allList()
			throws ServletException, IOException{
		System.out.println("controller - allList");
		return service.allList();
	}
	@GetMapping("/num/{changeNum}")
	public ExchangeListDTO detailNum(@PathVariable int changeNum) 
			throws ServletException, IOException{
		System.out.println("controller - detailNum");
		
		return service.detailNum(changeNum);
	}
	
	@PutMapping("/suc/{changeNum}")
	public Map<String,Object> changeSuccess(@PathVariable int changeNum)
			throws ServletException, IOException{
		System.out.println("controller - changeSuccess");
		
		int updateCnt = 0;
		String resultCode="";
		String resultMsg="";
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			updateCnt = service.changeSuccess(changeNum);
			if(updateCnt == 1) {
				resultCode = "200";
				resultMsg ="성공";
			}
		}catch(Exception e) {
			resultCode= "400";
			resultMsg ="실패";
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		return map;
	}
	
	@PutMapping("/fail/{changeNum}")
	public Map<String,Object> failSuccess(@PathVariable int changeNum){
		System.out.println("controller - changeSuccess");
		
		int updateCnt = 0;
		String resultCode="";
		String resultMsg="";
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			updateCnt = service.changeFail(changeNum);
			if(updateCnt == 1) {
				resultCode = "200";
				resultMsg ="성공";
			}
		}catch(Exception e) {
			resultCode= "400";
			resultMsg ="실패";
		}
		map.put("resultCode", resultCode);
		map.put("resultMsg", resultMsg);
		return map;
	}
	
}
