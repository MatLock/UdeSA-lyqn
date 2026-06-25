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
class JobPostSkillEntityTest {

  private static final String JOB_POST_SKILL_ID = "44444444-4444-4444-4444-444444444444";
  private static final String SKILL = "Java";

  @Mock
  private JobPostEntity jobPost;

  private JobPostSkillEntity jobPostSkillEntity;

  @BeforeEach
  void setUp() {
    jobPostSkillEntity = JobPostSkillEntity.builder()
        .id(JOB_POST_SKILL_ID)
        .jobPost(jobPost)
        .skill(SKILL)
        .build();
  }

  @Test
  void builderPopulatesAllScalarFields() {
    assertThat(jobPostSkillEntity.getId(), is(JOB_POST_SKILL_ID));
    assertThat(jobPostSkillEntity.getSkill(), is(SKILL));
  }

  @Test
  void builderWiresAssociatedJobPost() {
    assertThat(jobPostSkillEntity.getJobPost(), is(sameInstance(jobPost)));
  }

  @Test
  void settersUpdateFields() {
    JobPostSkillEntity target = new JobPostSkillEntity();

    target.setId(JOB_POST_SKILL_ID);
    target.setSkill(SKILL);
    target.setJobPost(jobPost);

    assertThat(target.getId(), is(JOB_POST_SKILL_ID));
    assertThat(target.getSkill(), is(SKILL));
    assertThat(target.getJobPost(), is(sameInstance(jobPost)));
  }
}