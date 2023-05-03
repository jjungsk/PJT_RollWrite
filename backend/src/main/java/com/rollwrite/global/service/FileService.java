package com.rollwrite.global.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.UUID;

@Service
@Slf4j
public class FileService {

    public String transferUrlToFile(String type, String profileImage) throws IOException {

        // String type의 url 주소를 RenderedImage 객체로 parsing
        URL imageURL = new URL(profileImage);
        RenderedImage image = ImageIO.read(imageURL);

        UUID uuid = UUID.randomUUID();
        String name = uuid + imageURL.getFile().replaceAll("/", "");
        String path = setPath(type);

        // 저장될 파일 객체를 생성
        File file = new File(path + name);
        
        // "/" 기준으로 root directory 생성 여부를 판단
        if (!file.getParentFile().exists())
            file.getParentFile().mkdirs();

        // image 파일을 file 객체에 write
        ImageIO.write(image, "png", file);

        return "/rollwrite/" + type + "/" + name;
    }

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