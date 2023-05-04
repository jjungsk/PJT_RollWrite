package com.rollwrite.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Schema(description = "개인 프로필 수정 DTO (이미지 삭제 포함)")
@Getter
@ToString
@RequiredArgsConstructor
public class ModifyUserReqDto implements Serializable {
    @Schema(description = "수정 할 프로필 닉네임", type = "String", example = "수정이")
    private final String nickname;
    @Schema(description = "프로필 이미지 삭제 버튼 클릭 여부", type = "Boolean", example = "false")
    private final Boolean isRemoveImage;
}
