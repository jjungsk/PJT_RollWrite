package com.rollwrite.domain.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    @GetMapping()
    public ResponseEntity<?> test() {
        log.info("test");
        return new ResponseEntity<>("test", HttpStatus.OK);
    }

}