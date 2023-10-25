package com.example.project_team.service;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import net.nurigo.sdk.message.model.Message;

@Service
public class SmsService {

//	//회원가입 시 본인 인증
//    public void certifiedPhoneNumber(String u_phone, String cerNum) {
//    	System.out.println("여기는??");
//        String api_key = "NCSQZON2LOBCJE6Q";
//        String api_secret = "I2PY7ZM6VBHSMV1FEJFB91UZP7BE5CBD";
//        Message coolsms = new Message(api_key, api_secret);
//
//        // 4 params(to, from, type, text) are mandatory. must be filled
//        HashMap<String, String> params = new HashMap<String, String>();
//        params.put("to", u_phone); // 수신전화번호
//        params.put("from", "010-6268-3836"); // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
//        params.put("type", "SMS");
//        params.put("text", "[BitMovie] 문자 본인인증 서비스 : 인증번호는 " + "[" + cerNum + "]" + " 입니다.");
//        params.put("app_version", "test app 1.2"); // application name and version
//        System.out.println("params"+params);
//        try {
//            JSONObject obj = (JSONObject) coolsms.send(params);
//            System.out.println(obj.toString());
//        } catch (CoolsmsException e) {
//            System.out.println(e.getMessage());
//            System.out.println(e.getCode());
//        }   
//    }
}
