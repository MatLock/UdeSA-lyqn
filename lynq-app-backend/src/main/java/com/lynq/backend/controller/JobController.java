package com.lynq.backend.controller;

import com.lynq.backend.controller.request.CreateJobRequest;
import com.lynq.backend.controller.response.CreateJobRestResponse;
import com.lynq.backend.controller.response.GlobalRestResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

@Tag(name = "Job", description = "Operations for managing Lynq platform job posts")
public interface JobController {

  @Operation(
      summary = "Create a job post",
      description = "Creates a job post for the company owned by the authenticated user. The owner "
          + "identity is resolved from the bearer token and must be a COMPANY-type user linked to "
          + "a company.",
      security = @SecurityRequirement(name = "bearerAuth"))
  ResponseEntity<GlobalRestResponse<CreateJobRestResponse>> createJob(
      @Valid CreateJobRequest request);

}