package com.lynq.iam.e2e;

import com.lynq.iam.service.RedisService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class RedisSmokeE2ETest extends AbstractE2ETest {

  @Autowired
  private RedisService redisService;

  @Autowired
  private RedisTemplate<String, String> redisTemplate;

  @Test
  void redisContainerIsReachable() {
    assertThat(REDIS.isRunning()).isTrue();
    assertThat(redisTemplate.getConnectionFactory()).isNotNull();
  }

  @Test
  void savedRefreshTokenCanBeReadBack() {
    String userId = UUID.randomUUID().toString();
    String refreshToken = UUID.randomUUID().toString();

    redisService.saveRefreshTokenForUser(userId, refreshToken);

    assertThat(redisService.findUserIdByRefreshToken(refreshToken)).isEqualTo(userId);
  }
}