package com.lynq.backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.hamcrest.Matchers.sameInstance;

@ExtendWith(MockitoExtension.class)
class UserApplicationJobEntityTest {

  private static final String APPLICATION_ID = "55555555-5555-5555-5555-555555555555";
  private static final LocalDate APPLIED_ON = LocalDate.of(2026, 6, 25);
  private static final LocalDate APPLICATION_SEEN_ON = LocalDate.of(2026, 6, 26);

  @Mock
  private JobPostEntity jobPost;

  @Mock
  private UserEntity user;

  private UserApplicationJobEntity userApplicationJobEntity;

  @BeforeEach
  void setUp() {
    userApplicationJobEntity = UserApplicationJobEntity.builder()
        .id(APPLICATION_ID)
        .jobPost(jobPost)
        .user(user)
        .appliedOn(APPLIED_ON)
        .applicationSeenOn(APPLICATION_SEEN_ON)
        .build();
  }

  @Test
  void builderPopulatesAllScalarFields() {
    assertThat(userApplicationJobEntity.getId(), is(APPLICATION_ID));
    assertThat(userApplicationJobEntity.getAppliedOn(), is(APPLIED_ON));
    assertThat(userApplicationJobEntity.getApplicationSeenOn(), is(APPLICATION_SEEN_ON));
  }

  @Test
  void builderWiresAssociatedEntities() {
    assertThat(userApplicationJobEntity.getJobPost(), is(sameInstance(jobPost)));
    assertThat(userApplicationJobEntity.getUser(), is(sameInstance(user)));
  }

  @Test
  void applicationSeenOnIsNullWhenNotProvided() {
    UserApplicationJobEntity target = UserApplicationJobEntity.builder()
        .id(APPLICATION_ID)
        .jobPost(jobPost)
        .user(user)
        .appliedOn(APPLIED_ON)
        .build();

    assertThat(target.getApplicationSeenOn(), is(nullValue()));
  }

  @Test
  void settersUpdateFields() {
    UserApplicationJobEntity target = new UserApplicationJobEntity();

    target.setId(APPLICATION_ID);
    target.setAppliedOn(APPLIED_ON);
    target.setApplicationSeenOn(APPLICATION_SEEN_ON);
    target.setJobPost(jobPost);
    target.setUser(user);

    assertThat(target.getId(), is(APPLICATION_ID));
    assertThat(target.getAppliedOn(), is(APPLIED_ON));
    assertThat(target.getApplicationSeenOn(), is(APPLICATION_SEEN_ON));
    assertThat(target.getJobPost(), is(sameInstance(jobPost)));
    assertThat(target.getUser(), is(sameInstance(user)));
  }
}