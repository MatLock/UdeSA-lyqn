package com.lynq.backend.security;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/**
 * Authenticated user identity resolved from the lynq-iam access token and
 * stored as the principal of the Spring Security context for the duration of
 * the request.
 */
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class LynqUserPrincipal {

  private final String id;
  private final String username;
  private final String email;

}
