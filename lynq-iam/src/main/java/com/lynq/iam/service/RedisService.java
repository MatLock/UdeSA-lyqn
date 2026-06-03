package com.lynq.iam.service;

import com.lynq.iam.aspect.AuditLog;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisService {

  private final RedisTemplate<String, String> redisTemplate;

  public RedisService(RedisTemplate<String, String> redisTemplate) {
    this.redisTemplate = redisTemplate;
  }


  @AuditLog
  public void saveRefreshTokenForUser(String userId, String refreshToken) {
    redisTemplate.opsForValue().set(
        "refresh:" + refreshToken,
        userId,
        Duration.ofDays(30)
    );
  }

  public String findUserIdByRefreshToken(String refreshToken) {
    return redisTemplate.opsForValue().get("refresh:" + refreshToken);
  }
}
