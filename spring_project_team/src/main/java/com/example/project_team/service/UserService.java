package com.example.project_team.service;

import java.nio.CharBuffer; // 경로 주의
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.project_team.dto.AdminCredentialsDTO;
import com.example.project_team.dto.CredentialsDTO;
import com.example.project_team.dto.SignUpDTO;
import com.example.project_team.dto.UserDTO;
import com.example.project_team.entities.Admin;
import com.example.project_team.entities.User;
import com.example.project_team.exception.AppException;
import com.example.project_team.mappers.UserMapper;
import com.example.project_team.repository.AdminRepository;
import com.example.project_team.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	private final AdminRepository adminRepository;
	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;
	
	public UserDTO findById(String id) {
		System.out.println("<<<UserService - findById>>>");
		User user = userRepository.findById(id).orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		return userMapper.toUserDTO(user);
	}
	
	public User login(CredentialsDTO credentialsDTO) {
		System.out.println("<<<UserService - login>>>");
		User user = userRepository.findById(credentialsDTO.getId())
				.orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		
		// 경로 주의 : import java.nio.CharBuffer;
		// 비밀번호 인코더를 사용하여 비밀번호가 일반 텍스트로 저장되는 것을 방지하지만 해시된 비밀번호는 읽을 수 없다
		if(passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.getPassword()), user.getPassword())) {
			return user;
		}
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
	}
	
	public Admin admin(AdminCredentialsDTO AdminCredentialsDTO) {
		System.out.println("<<<UserService - admin>>>");
		Admin admin = adminRepository.findById(AdminCredentialsDTO.getId())
				.orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		System.out.println("1:"+AdminCredentialsDTO.getPassword());
		System.out.println("2:"+admin.getPassword());
		// 경로 주의 : import java.nio.CharBuffer;
		// 비밀번호 인코더를 사용하여 비밀번호가 일반 텍스트로 저장되는 것을 방지하지만 해시된 비밀번호는 읽을 수 없다
		if(AdminCredentialsDTO.getPassword().equals(admin.getPassword())) {
			return admin;
		}
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
	}
	
	public User register(SignUpDTO userDTO) {
		System.out.println("<<<UserService - register>>>");
		System.out.println("Id : " + userDTO.getId());
		System.out.println("Password : " + userDTO.getPassword());
		System.out.println("name : " + userDTO.getName());
		System.out.println("residentRegistrationNumber : " + userDTO.getResidentRegistrationNumber());
		System.out.println("address : " + userDTO.getAddress());
		System.out.println("hp : " + userDTO.getHp());
		System.out.println("job : " + userDTO.getJob());
		System.out.println("email : " + userDTO.getEmail());
		System.out.println("Token:"+userDTO.getToken());
		
		Optional<User> optionalUser = userRepository.findById(userDTO.getId());
		
		if(optionalUser.isPresent()) {
			throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
		}
		
		User user = new User();
		user.setId(userDTO.getId());
		user.setName(userDTO.getName());
		user.setResidentRegistrationNumber(userDTO.getResidentRegistrationNumber());
		user.setAddress(userDTO.getAddress());
		user.setHp(userDTO.getHp());
		user.setJob(userDTO.getJob());
		user.setEmail(userDTO.getEmail());
		user.setToken(userDTO.getToken());
		
		// passwordEncoder를 사용하여 암호를 일반 텍스트로 젖아하지 않고 해시한다
		user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDTO.getPassword())));
		
		User saveUser = userRepository.save(user);
		
		return saveUser;
	}
}