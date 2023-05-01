package com.rollwrite.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@ToString
@RequiredArgsConstructor
public class ModifyUserReqDto {
    private final String nickname;
    private final String profileImage;

}
