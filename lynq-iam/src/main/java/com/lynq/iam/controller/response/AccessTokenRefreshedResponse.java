package com.lynq.iam.controller.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AccessTokenRefreshedResponse {
  private String accessToken;
}
