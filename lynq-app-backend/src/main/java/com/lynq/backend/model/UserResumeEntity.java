package com.lynq.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "user_resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResumeEntity {

  @Id
  @Column(name = "id", length = 36, nullable = false)
  private String id;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "resume", columnDefinition = "JSON")
  private String resume;

  @Enumerated(EnumType.STRING)
  @Column(name = "language", nullable = false)
  private Language language;

  @Column(name = "created_on", nullable = false)
  private LocalDate createdOn;

  @Column(name = "storage_path", length = 255)
  private String storagePath;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

}