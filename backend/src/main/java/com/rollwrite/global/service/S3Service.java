package com.rollwrite.global.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class S3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

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

    @Transactional
    public void deleteFile(String storeFileUrl) {
        log.info("S3 파일 삭제 : {}", storeFileUrl);

        String keyName = storeFileUrl;
        boolean isFileExisted = amazonS3Client.doesObjectExist(bucket, keyName);

        log.info("S3 파일 존재 하는지? {}", isFileExisted);
    }

}
