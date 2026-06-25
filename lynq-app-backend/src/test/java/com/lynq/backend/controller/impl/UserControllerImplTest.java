package com.lynq.backend.controller.impl;

import com.lynq.backend.controller.request.CreateUserRequest;
import com.lynq.backend.controller.response.CreateUserRestResponse;
import com.lynq.backend.controller.response.GlobalRestResponse;
import com.lynq.backend.enums.UserType;
import com.lynq.backend.model.UserEntity;
import com.lynq.backend.security.LynqUserPrincipal;
import com.lynq.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserControllerImplTest {

  private static final String USER_ID = "550e8400-e29b-41d4-a716-446655440000";
  private static final String USERNAME = "janedoe";
  private static final String EMAIL = "jane@lynq.com";
  private static final UserType USER_TYPE = UserType.CANDIDATE;
  private static final String PROFILE_IMAGE_URL = "https://cdn.lynq.com/avatars/jane.png";
  private static final String CURRENT_POSITION = "Backend Engineer";
  private static final String ABOUT = "Java developer focused on distributed systems.";
  private static final String GITHUB_URL = "https://github.com/janedoe";
  private static final String LINKEDIN_URL = "https://linkedin.com/in/janedoe";
  private static final LocalDate BIRTH_DATE = LocalDate.of(1995, 4, 12);
  private static final LocalDate CREATED_ON = LocalDate.of(2026, 6, 25);

  @Mock
  private UserService userService;

  private UserControllerImpl userController;

  private CreateUserRequest request;
  private LynqUserPrincipal principal;

  @BeforeEach
  void setUp() {
    userController = new UserControllerImpl(userService);
    principal = new LynqUserPrincipal(USER_ID, USERNAME, EMAIL);
    request = new CreateUserRequest();
    request.setUserType(USER_TYPE);
    request.setUserProfileImageUrl(PROFILE_IMAGE_URL);
    request.setCurrentPosition(CURRENT_POSITION);
    request.setAbout(ABOUT);
    request.setGithubUrl(GITHUB_URL);
    request.setLinkedinUrl(LINKEDIN_URL);
    request.setBirthDate(BIRTH_DATE);
  }

  @Test
  void createUserDelegatesToServiceWithPrincipalIdAndRequestFields() {
    when(userService.saveNewUser(USER_ID, USER_TYPE, PROFILE_IMAGE_URL, CURRENT_POSITION, ABOUT,
        GITHUB_URL, LINKEDIN_URL, BIRTH_DATE)).thenReturn(savedUser());

    userController.createUser(request, principal);

    verify(userService).saveNewUser(USER_ID, USER_TYPE, PROFILE_IMAGE_URL, CURRENT_POSITION, ABOUT,
        GITHUB_URL, LINKEDIN_URL, BIRTH_DATE);
  }

  @Test
  void createUserRespondsWithCreatedStatus() {
    when(userService.saveNewUser(USER_ID, USER_TYPE, PROFILE_IMAGE_URL, CURRENT_POSITION, ABOUT,
        GITHUB_URL, LINKEDIN_URL, BIRTH_DATE)).thenReturn(savedUser());

    ResponseEntity<GlobalRestResponse<CreateUserRestResponse>> response =
        userController.createUser(request, principal);

    assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
  }

  @Test
  void createUserWrapsSuccessfulResponseBody() {
    when(userService.saveNewUser(USER_ID, USER_TYPE, PROFILE_IMAGE_URL, CURRENT_POSITION, ABOUT,
        GITHUB_URL, LINKEDIN_URL, BIRTH_DATE)).thenReturn(savedUser());

    ResponseEntity<GlobalRestResponse<CreateUserRestResponse>> response =
        userController.createUser(request, principal);

    GlobalRestResponse<CreateUserRestResponse> body = response.getBody();
    assertThat(body, is(org.hamcrest.Matchers.notNullValue()));
    assertThat(body.isSuccess(), is(true));
  }

  @Test
  void createUserMapsSavedEntityIntoResponseData() {
    when(userService.saveNewUser(USER_ID, USER_TYPE, PROFILE_IMAGE_URL, CURRENT_POSITION, ABOUT,
        GITHUB_URL, LINKEDIN_URL, BIRTH_DATE)).thenReturn(savedUser());

    ResponseEntity<GlobalRestResponse<CreateUserRestResponse>> response =
        userController.createUser(request, principal);

    CreateUserRestResponse data = response.getBody().getData();
    assertThat(data.getId(), is(USER_ID));
    assertThat(data.getUserType(), is(USER_TYPE));
    assertThat(data.getUserProfileImageUrl(), is(PROFILE_IMAGE_URL));
    assertThat(data.getCurrentPosition(), is(CURRENT_POSITION));
    assertThat(data.getAbout(), is(ABOUT));
    assertThat(data.getGithubUrl(), is(GITHUB_URL));
    assertThat(data.getLinkedinUrl(), is(LINKEDIN_URL));
    assertThat(data.getBirthDate(), is(BIRTH_DATE));
    assertThat(data.getCreatedOn(), is(CREATED_ON));
  }

  private UserEntity savedUser() {
    return UserEntity.builder()
        .id(USER_ID)
        .type(USER_TYPE)
        .profileImageUrl(PROFILE_IMAGE_URL)
        .currentPosition(CURRENT_POSITION)
        .about(ABOUT)
        .githubUrl(GITHUB_URL)
        .linkedinUrl(LINKEDIN_URL)
        .birthDate(BIRTH_DATE)
        .createdOn(CREATED_ON)
        .build();
  }
}