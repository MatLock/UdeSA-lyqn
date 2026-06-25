package com.lynq.backend.repository;

import com.lynq.backend.model.UserApplicationJobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserApplicationJobRepository extends JpaRepository<UserApplicationJobEntity, String> {
}