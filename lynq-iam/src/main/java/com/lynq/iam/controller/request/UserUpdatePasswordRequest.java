package com.lynq.iam.controller.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdatePasswordRequest {

  @NotBlank
  @Size(min = 8)
  @Schema(description = "User password", example = "P@ssw0rd123", minLength = 8)
  private String newPassword;

}
