package com.rollwrite.domain.user.repository;

import com.rollwrite.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // (공통) userId 로 조회
    Optional<User> findById(Long Id);

    // (카카오 Identifier) 회원가입 유무를 확인
    Optional<User> findByIdentifier(String identifier);

}