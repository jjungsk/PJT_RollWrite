package com.rollwrite.global.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class S3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 1. S3 이미지 업로드
    @Transactional
    public String addFile(MultipartFile multipartFile) {
        // S3 파일 타입 및 사이즈 지정
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(multipartFile.getSize());

        String originalFilename = multipartFile.getOriginalFilename();
        int index = originalFilename.lastIndexOf(".");
        String ext = originalFilename.substring(index + 1);

        String storeFilename = UUID.randomUUID() + "." + ext;
        String key = "userprofile/" + storeFilename; // 디렉토리 경로 + 파일 이름

        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            e.printStackTrace();
            log.error("S3 파입 업로드 실패", e);
        }

        String storeFileUrl = amazonS3Client.getUrl(bucket, key).toString();

        return storeFileUrl;
    }

    // 2. S3 이미지 삭제
    @Transactional
    public void deleteFile(String storeFileUrl) {
        log.info("S3 파일 삭제 : {}", storeFileUrl);

        String keyName = storeFileUrl.split("amazonaws.com/")[1];
        boolean isFileExisted = amazonS3Client.doesObjectExist(bucket, keyName);
        log.info("S3 파일 존재 하는지? {}", isFileExisted);
        if(isFileExisted) {
            amazonS3Client.deleteObject(bucket, keyName);
        } else {
            log.info("S3 해당 파일이 없습니다.");
        }

    }

    // kakao image url을 multipart 파일로 변환해서 s3 업로드 필요..?
    @Transactional
    public MultipartFile getMultipartFile(String url) throws IOException {
        File file = new File(url);
        FileItem fileItem = new DiskFileItem("originFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

        try {
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);
            // Or faster..
            // IOUtils.copy(new FileInputStream(file), fileItem.getOutputStream());
        } catch (IOException ex) {
            // do something.
        }

        //jpa.png -> multipart 변환
        MultipartFile mFile = new CommonsMultipartFile(fileItem);
        return mFile;
    }

}
