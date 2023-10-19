package com.example.project_team.exceptionHandler;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FundErrorResponse {
   private boolean success;
    private String message;

}