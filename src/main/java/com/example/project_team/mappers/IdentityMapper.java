package com.example.project_team.mappers;


import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project_team.dto.IdentityDTO;


@Mapper
public interface IdentityMapper extends JpaRepository<IdentityDTO, Integer> {

}
