package com.rollwrite.domain.user.repository;

import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(Long Id);

    Optional<User> findByIdentifier(String identifier);

    List<User> findAllByType(UserType userType);

}