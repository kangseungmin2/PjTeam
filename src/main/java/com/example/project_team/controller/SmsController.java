package com.example.project_team.controller;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;

import java.util.Random;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins="**",maxAge=3600)
@RequestMapping("/sms")
@RestController
public class SmsController {

	final DefaultMessageService messageService;
	
	 public SmsController() {
	        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
	        this.messageService = NurigoApp.INSTANCE.initialize("NCSQZON2LOBCJE6Q", "I2PY7ZM6VBHSMV1FEJFB91UZP7BE5CBD", "https://api.coolsms.co.kr");
	 }
	 
	@PostMapping("/sns") //jsp 페이지 넘긴 mapping 값
	@ResponseBody 
    public String sendOne(@RequestBody String phoneNumber) {
		String phoneNumberWithoutQuotes = phoneNumber.replace("\"", "");
		Random rand  = new Random(); //랜덤숫자 생성하기 !!
        String numStr = "";
        for(int i=0; i<4; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            numStr+=ran;
        }
        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01062683836");
        message.setTo(phoneNumberWithoutQuotes);

        message.setText("한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 추가됩니다."+numStr);
        
        
        this.messageService.sendOne(new SingleMessageSendingRequest(message));

        return numStr;
    }

}