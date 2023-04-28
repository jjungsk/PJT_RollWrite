package com.rollwrite.global.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Controller 가 아닌 곳에서, 서버 응답값(바디) 직접 변경 및 전달하기 위한 Response
 */
public class DirectResponse {

    public static void sendError(HttpServletRequest request, HttpServletResponse response, Exception ex, HttpStatus httpStatus) throws IOException {
        response.setStatus(httpStatus.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        String message = ex.getMessage();
        message = message == null? "": message;
        Map<String, Object> data = ImmutableMap.of(
                "status", httpStatus.value(),
                "error", ex.getClass().getSimpleName(),
                "message", message
//                "timestamp", Calendar.getInstance().getTime(),
//                "path", request.getRequestURI()
        );

        PrintWriter pw = response.getWriter();
        pw.print(new ObjectMapper().writeValueAsString(data));
        pw.flush();
    }

    public static void sendError(HttpServletRequest request, HttpServletResponse response, Exception ex) throws IOException {
        sendError(request, response, ex, HttpStatus.UNAUTHORIZED);
    }

}
