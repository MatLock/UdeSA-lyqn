package com.lynq.backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.sameInstance;

@ExtendWith(MockitoExtension.class)
class UserSkillsEntityTest {

  private static final String USER_SKILL_ID = "66666666-6666-6666-6666-666666666666";
  private static final String SKILL = "Spring Boot";

  @Mock
  private UserEntity user;

  private UserSkillsEntity userSkillsEntity;

  @BeforeEach
  void setUp() {
    userSkillsEntity = UserSkillsEntity.builder()
        .id(USER_SKILL_ID)
        .user(user)
        .skill(SKILL)
        .build();
  }

  @Test
  void builderPopulatesAllScalarFields() {
    assertThat(userSkillsEntity.getId(), is(USER_SKILL_ID));
    assertThat(userSkillsEntity.getSkill(), is(SKILL));
  }

  @Test
  void builderWiresAssociatedUser() {
    assertThat(userSkillsEntity.getUser(), is(sameInstance(user)));
  }

  @Test
  void settersUpdateFields() {
    UserSkillsEntity target = new UserSkillsEntity();

    target.setId(USER_SKILL_ID);
    target.setSkill(SKILL);
    target.setUser(user);

    assertThat(target.getId(), is(USER_SKILL_ID));
    assertThat(target.getSkill(), is(SKILL));
    assertThat(target.getUser(), is(sameInstance(user)));
  }
}