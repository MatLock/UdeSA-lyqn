package com.lynq.iam.security;

import com.lynq.iam.aspect.AuditLog;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;

@Service
public class RefreshTokenGenerator {

  @AuditLog
  public String generate() {
    byte[] bytes = new byte[64];
    SecureRandom secureRandom = new SecureRandom();
    secureRandom.nextBytes(bytes);
    return Base64.getUrlEncoder()
        .withoutPadding()
        .encodeToString(bytes);
  }
}
