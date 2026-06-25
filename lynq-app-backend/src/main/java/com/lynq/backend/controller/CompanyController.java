package com.lynq.backend.controller;

import com.lynq.backend.controller.request.CreateUserWithCompanyRequest;
import com.lynq.backend.controller.response.CreateUserWithCompanyRestResponse;
import com.lynq.backend.controller.response.GlobalRestResponse;
import com.lynq.backend.security.LynqUserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

@Tag(name = "Company", description = "Operations for managing Lynq platform companies")
public interface CompanyController {

  @Operation(
      summary = "Create a company together with its owner profile",
      description = "Creates the profile of the authenticated user as a COMPANY-type user and the "
          + "company they own in a single call. The owner identity is resolved from the bearer "
          + "token, while the company id is generated server-side.",
      security = @SecurityRequirement(name = "bearerAuth"))
  @ApiResponses({
      @ApiResponse(
          responseCode = "201",
          description = "User and company created successfully",
          content = @Content(
              schema = @Schema(implementation = CreateUserWithCompanyRestResponse.class),
              examples = @ExampleObject(
                  name = "Created",
                  value = """
                      {
                        "success": true,
                        "data": {
                          "companyId": "018f9c3a-2b1d-7c4e-9a6f-1e2d3c4b5a60",
                          "companyName": "Lynq",
                          "companyAbout": "Hiring platform for engineers.",
                          "companySize": 42,
                          "companyProfileImageUrl": "https://cdn.lynq.com/logos/lynq.png",
                          "companyCreatedOn": "2026-06-25",
                          "ownerUserId": "550e8400-e29b-41d4-a716-446655440000"
                        }
                      }"""))),
      @ApiResponse(
          responseCode = "400",
          description = "Validation failed on one or more request fields",
          content = @Content(
              examples = @ExampleObject(
                  name = "Invalid fields",
                  value = """
                      {
                        "success": false,
                        "data": {
                          "companyName": "must not be blank",
                          "birthDate": "must not be null"
                        },
                        "reason": "Invalid Fields Found"
                      }"""))),
      @ApiResponse(
          responseCode = "403",
          description = "Missing required lynq-request-uuid header",
          content = @Content(
              examples = @ExampleObject(
                  name = "Missing header",
                  value = """
                      {
                        "success": false,
                        "data": null,
                        "reason": "Missing required header"
                      }"""))),
      @ApiResponse(
          responseCode = "401",
          description = "Missing or invalid bearer token",
          content = @Content(
              examples = @ExampleObject(
                  name = "Unauthorized",
                  value = """
                      {
                        "success": false,
                        "data": null,
                        "reason": "Invalid or expired token"
                      }"""))),
      @ApiResponse(
          responseCode = "500",
          description = "Unexpected server error",
          content = @Content(
              examples = @ExampleObject(
                  name = "Server error",
                  value = """
                      {
                        "success": false,
                        "data": null,
                        "reason": "Unexpected error"
                      }""")))
  })
  @Parameters({
      @Parameter(
          name = "lynq-request-uuid",
          in = ParameterIn.HEADER,
          required = true,
          description = "Unique identifier for the request, echoed back in the response and used "
              + "for log correlation. Requests without it are rejected with 403.",
          example = "550e8400-e29b-41d4-a716-446655440000")
  })
  ResponseEntity<GlobalRestResponse<CreateUserWithCompanyRestResponse>> createUserWithCompany(
      @io.swagger.v3.oas.annotations.parameters.RequestBody(
          description = "Owner profile details and company details",
          required = true,
          content = @Content(examples = @ExampleObject(
              name = "Company owner",
              value = """
                  {
                    "userProfileImageUrl": "https://cdn.lynq.com/avatars/jane.png",
                    "currentPosition": "Founder",
                    "userAbout": "Building the Lynq hiring platform.",
                    "linkedinUrl": "https://linkedin.com/in/janedoe",
                    "birthDate": "1995-04-12",
                    "companyName": "Lynq",
                    "companyAbout": "Hiring platform for engineers.",
                    "companySize": 42,
                    "companyProfileImageUrl": "https://cdn.lynq.com/logos/lynq.png"
                  }""")))
      @Valid CreateUserWithCompanyRequest request,
      @Parameter(hidden = true) LynqUserPrincipal principal);

}