package com.example.project_team.exceptionHandler;

public class FundCustomException extends RuntimeException {

    public FundCustomException(String message) {
        super(message);
    }
}