package com.rollwrite.global.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.UUID;

@Service
@Slf4j
public class FileService {
    public String fileUpload(String type, MultipartFile image) throws IOException {
        //서버에 파일 저장
        UUID uuid = UUID.randomUUID();
        String name = uuid.toString() + image.getOriginalFilename().replaceAll(" ", "");
        log.info(name);
        File file = null;

        String path = setPath(type);
        file = new File(path + name);

        if (!file.getParentFile().exists())
            file.getParentFile().mkdirs();

        image.transferTo(file);
        return "/rollwrite/" + type + "/" + name;
    }

    public Resource fileDownload(String path, HttpHeaders headers) throws IOException {
        Resource resource = new FileSystemResource(getPath(path));

        // 원본 파일에서 uuid 자르기
        String filename = resource.getFilename().substring(36);
        log.info("filename : " + filename);

        String downloadName = URLEncoder.encode(filename, StandardCharsets.UTF_8).replaceAll("\\+", "%20");
        String contentType = Files.probeContentType(resource.getFile().toPath());

        headers.add("Content-type", contentType);
        headers.add("Content-Disposition", "attachment; filename=" + downloadName);

        return resource;
    }

    public void fileDelete(String path) throws UnknownHostException {
        File file = new File(getPath(path));
        if (!file.delete())
            throw new IllegalArgumentException("파일 삭제에 실패했습니다");
    }

    private String setPath(String type) throws UnknownHostException {
        String hostname = InetAddress.getLocalHost().getHostName();
        String path = "";

        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:/rollwrite/" + type + "/";
        } else {
            path = "/var/lib/rollwrite/" + type + "/";
        }

        return path;
    }

    private String getPath(String path) throws UnknownHostException {
        String hostname = InetAddress.getLocalHost().getHostName();

        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:" + path;
        } else {
            path = "/var/lib" + path;
        }

        return path;
    }
}