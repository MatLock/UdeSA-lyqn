package com.lynq.backend.controller.request;

import com.lynq.backend.enums.UserType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class CreateUserRequest {

  @NotNull
  private UserType userType;
  private String userProfileImageUrl;
  @NotBlank
  private String currentPosition;
  @NotBlank
  private String about;
  private String githubUrl;
  private String linkedinUrl;
  @NotNull
  private LocalDate birthDate;




}
