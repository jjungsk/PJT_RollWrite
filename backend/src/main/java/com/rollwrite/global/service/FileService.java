package com.rollwrite.global.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
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

    public void fileDelete(String path) throws UnknownHostException {
        File file = new File(getPath(path));
        file.delete();
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