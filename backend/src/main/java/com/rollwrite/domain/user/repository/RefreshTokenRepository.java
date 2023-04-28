package com.rollwrite.domain.user.repository;

import com.rollwrite.domain.user.entity.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * Redis Repository
 * Refresh Token 저장
 */
@RequiredArgsConstructor
@Repository
public class RefreshTokenRepository {
    @Value("${jwt.expiration.rtk}")
    private Long REFRESH_TOKEN_EXPIRATION;
    private final RedisTemplate redisTemplate;


    public void saveRefreshToken(RefreshToken refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(refreshToken.getIdentifier(), refreshToken.getRefreshToken());
        redisTemplate.expire(refreshToken.getIdentifier(), REFRESH_TOKEN_EXPIRATION, TimeUnit.MILLISECONDS);
    }

    public Optional<RefreshToken> findByIdentifier(final String identifier) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String refreshToken = valueOperations.get(identifier);

        if (Objects.isNull(refreshToken)) {
            return Optional.empty();
        }

        return Optional.of(new RefreshToken(identifier, refreshToken));
    }

}
