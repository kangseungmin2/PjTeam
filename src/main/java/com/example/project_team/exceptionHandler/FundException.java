package com.example.project_team.exceptionHandler;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class FundException {
   @ExceptionHandler(FundCustomException.class)
   public ResponseEntity<FundErrorResponse> handleFundCustomException(FundCustomException ex) {
       
      // 사용자 정의 응답 객체를 생성
      FundErrorResponse response = new FundErrorResponse(false, ex.getMessage());
   
       // JSON 형식으로 변환하여 반환
       return new ResponseEntity<FundErrorResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
   }
}