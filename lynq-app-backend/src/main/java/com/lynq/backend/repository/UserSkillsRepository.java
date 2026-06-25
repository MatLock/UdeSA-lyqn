package com.lynq.backend.repository;

import com.lynq.backend.model.UserSkillsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSkillsRepository extends JpaRepository<UserSkillsEntity, String> {
}