package com.lynq.backend.repository;

import com.lynq.backend.model.UserResumeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserResumeRepository extends JpaRepository<UserResumeEntity, String> {
}