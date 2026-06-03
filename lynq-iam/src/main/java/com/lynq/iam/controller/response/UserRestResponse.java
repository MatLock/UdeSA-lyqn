package com.lynq.iam.controller.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.OffsetDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Successful response containing user data")
public class UserRestResponse {

    @Schema(description = "User ID", example = "550e8400-e29b-41d4-a716-446655440000")
    private String id;

    @Schema(description = "Username", example = "johndoe")
    private String username;

    @Schema(description = "Email address", example = "johndoe@example.com")
    private String email;

    @Schema(description = "Account creation date", example = "2026-06-02T19:30:00Z")
    private OffsetDateTime creationDate;

    @Schema(description = "Refresh token", example = "eyJhbGciOiJIUzI1NiJ9...")
    private String refreshToken;

    @Schema(description = "Access token", example = "eyJhbGciOiJIUzI1NiJ9...")
    private String accessToken;
}