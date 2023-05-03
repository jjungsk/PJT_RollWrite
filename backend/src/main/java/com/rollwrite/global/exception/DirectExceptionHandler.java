package com.rollwrite.global.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.rollwrite.global.model.ApiResponse;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Controller 가 아닌 곳에서, 서버 응답값(바디) 직접 변경 및 전달하기 위한 Response
 */
@Slf4j
public class DirectExceptionHandler {

    public static void sendError(HttpServletResponse response, ApiResponse apiResponse) throws IOException {
        response.setStatus(apiResponse.getStatusCode());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        PrintWriter pw = response.getWriter();
        String text = new ObjectMapper().writeValueAsString(apiResponse);
        pw.print(text);
        log.info("Response Error Message : {}", text);
        pw.flush();
    }

}
