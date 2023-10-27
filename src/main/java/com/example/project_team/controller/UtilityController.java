package com.example.project_team.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_team.dto.AccountDTO;
import com.example.project_team.dto.FundTransactionDTO;
import com.example.project_team.dto.UtilTransactionDTO;
import com.example.project_team.dto.UtilityDTO;
import com.example.project_team.exceptionHandler.CustomException;
import com.example.project_team.exceptionHandler.ErrorResponse;
import com.example.project_team.service.UtilityService;


@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/utilityList")
@RestController
public class UtilityController {

	@Autowired
	private UtilityService service;
	
	//공과금납부
	@PostMapping
	public Map<String,Object> utilPay1(@RequestBody UtilTransactionDTO dto) {
		System.out.println("<<<AccountController - utilPay1>>>");
		int insertCnt = 0;
		String resultCode="";
		String resultMsg="";
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			System.out.println("dto:"+dto);
			insertCnt = service.utilPay1(dto);
			if(insertCnt == 1) {
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
	
	//전체 리스트
	@GetMapping("/a/{id}")
	public List<UtilTransactionDTO> utilityList(@PathVariable("id") String id) 
		throws ServletException, IOException{
		System.out.println("UtilityController - utilityList");
		return service.utilityList(id);
	}
	
	//납부할때 정보가져오기
	@GetMapping("/info/{utilityId}")
	public UtilityDTO utilityInfo(@PathVariable("utilityId") String utilityId)
			throws ServletException, IOException{
		System.out.println("UtilityController - utilityInfo");
		return service.utilityInfo(utilityId);
	}
	
	//납부정보 유무 체크
	@GetMapping("/chk/{utilityType}/{utilityId}")
	public UtilityDTO utilityCheck(@PathVariable("utilityType") String utilityType, @PathVariable("utilityId") String utilityId) {
		System.out.println("utilityType "+utilityType);
		System.out.println("utilityId "+utilityId);
		return service.utilityCheck(utilityType,utilityId);
	}
	
	// 즉시이체
	@PostMapping("/utilTransfer")
	public ResponseEntity<ErrorResponse> utilTransfer(@RequestBody UtilTransactionDTO dto)
			throws ServletException, IOException {
            try {
    		  	service.utilTransfer(dto);// Service 클래스 호출
                return ResponseEntity.ok(new ErrorResponse(true, "성공적으로 이체가 완료되었습니다."));
            } catch (CustomException ex) {
                // Service에서 발생한 예외 처리
                return ResponseEntity.ok(new ErrorResponse(false, ex.getMessage()));
                //return new ResponseEntity<FundErrorResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
	}
	
	//회원 결산
	@GetMapping("/memberAccount")
	public List<UtilTransactionDTO> openAccountData2() 
		throws ServletException, IOException{
		System.out.println("UtilityController - openAccountData2");
		return service.openAccountData2();
	}
}
