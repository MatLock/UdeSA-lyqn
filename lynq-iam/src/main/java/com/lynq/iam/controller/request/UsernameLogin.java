package com.lynq.iam.controller.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsernameLogin {

  @NotBlank
  @Size(min = 3, max = 20)
  @Schema(description = "Unique username", example = "johndoe", minLength = 3, maxLength = 20)
  private String username;
  @NotBlank
  @Size(min = 8)
  @Schema(description = "User password", example = "P@ssw0rd123", minLength = 8)
  private String password;

}
