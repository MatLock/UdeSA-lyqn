package com.lynq.iam.controller.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
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
public class EmailUserLogin {

  @NotBlank
  @Email
  @Size(max = 100)
  @Schema(description = "Unique email address", example = "johndoe@example.com", maxLength = 100)
  private String email;
  @NotBlank
  @Size(min = 8)
  @Schema(description = "User password", example = "P@ssw0rd123", minLength = 8)
  private String password;

}
