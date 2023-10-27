package com.example.project_team.controller;

//DepositCalculatorController.java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/deposit-calculator")
public class DepositCalculatorController {
@GetMapping
public double calculateTotalAmount(
   @RequestParam("principal") double principal,
   @RequestParam("interestRate") double interestRate,
   @RequestParam("months") int months
) {
 // 계산 로직을 여기에 추가
 return principal + principal * (interestRate / 100) * months;
}
}
