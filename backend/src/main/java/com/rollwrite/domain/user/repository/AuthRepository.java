package com.rollwrite.domain.user.repository;

import com.rollwrite.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<User, String> {
    Optional<User> findByIdentifier(String identifier);
}
