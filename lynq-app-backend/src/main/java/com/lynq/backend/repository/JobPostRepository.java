package com.lynq.backend.repository;

import com.lynq.backend.model.JobPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostRepository extends JpaRepository<JobPostEntity, String> {
}