package com.lynq.backend.repository;

import com.lynq.backend.model.JobPostSkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostSkillRepository extends JpaRepository<JobPostSkillEntity, String> {
}