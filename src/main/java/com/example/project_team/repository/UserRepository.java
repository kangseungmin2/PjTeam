package com.example.project_team.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project_team.entities.User;	// 경로 주의

public interface UserRepository extends JpaRepository<User, String> {

//	Optional<User> findByLogin(String login);
}
