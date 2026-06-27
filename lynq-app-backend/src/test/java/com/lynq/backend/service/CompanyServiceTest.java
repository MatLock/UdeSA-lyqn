package com.lynq.backend.service;

import com.lynq.backend.controller.request.CreateUserWithCompanyRequest;
import com.lynq.backend.enums.UserType;
import com.lynq.backend.exceptions.BadRequestException;
import com.lynq.backend.model.CompanyEntity;
import com.lynq.backend.model.UserEntity;
import com.lynq.backend.repository.CompanyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.Matchers.sameInstance;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CompanyServiceTest {

  private static final String USER_ID = "550e8400-e29b-41d4-a716-446655440000";
  private static final String USER_PROFILE_IMAGE_URL = "https://cdn.lynq.com/avatars/jane.png";
  private static final String CURRENT_POSITION = "Founder";
  private static final String USER_ABOUT = "Building the Lynq hiring platform.";
  private static final String LINKEDIN_URL = "https://linkedin.com/in/janedoe";
  private static final LocalDate BIRTH_DATE = LocalDate.of(1995, 4, 12);
  private static final String COMPANY_NAME = "Lynq Technologies";
  private static final String COMPANY_ABOUT = "We build talent matching platforms.";
  private static final Integer COMPANY_SIZE = 250;
  private static final String COMPANY_PROFILE_IMAGE_URL = "https://cdn.lynq.com/logos/lynq.png";
  private static final String NO_GITHUB_URL = null;
  private static final String NO_FULL_NAME = null;

  @Mock
  private UserService userService;

  @Mock
  private CompanyRepository companyRepository;

  @Mock
  private CreateUserWithCompanyRequest request;

  private CompanyService companyService;

  @BeforeEach
  void setUp() {
    companyService = new CompanyService(userService, companyRepository);
  }

  @Test
  void createUserWithCompanyCreatesOwnerAsCompanyUserFromRequest() {
    stubRequestFields();

    companyService.createUserWithCompany(USER_ID, request);

    verify(userService).saveNewUser(USER_ID, UserType.COMPANY, NO_FULL_NAME, USER_PROFILE_IMAGE_URL,
        CURRENT_POSITION, USER_ABOUT, NO_GITHUB_URL, LINKEDIN_URL, BIRTH_DATE);
  }

  @Test
  void createUserWithCompanyPersistsCompanyBuiltFromRequestAndOwner() {
    stubRequestFields();
    UserEntity owner = UserEntity.builder().id(USER_ID).build();
    when(userService.saveNewUser(USER_ID, UserType.COMPANY, NO_FULL_NAME, USER_PROFILE_IMAGE_URL,
        CURRENT_POSITION, USER_ABOUT, NO_GITHUB_URL, LINKEDIN_URL, BIRTH_DATE)).thenReturn(owner);
    when(companyRepository.save(any(CompanyEntity.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));
    ArgumentCaptor<CompanyEntity> companyCaptor = ArgumentCaptor.forClass(CompanyEntity.class);

    companyService.createUserWithCompany(USER_ID, request);

    verify(companyRepository).save(companyCaptor.capture());
    CompanyEntity saved = companyCaptor.getValue();
    assertThat(saved.getName(), is(COMPANY_NAME));
    assertThat(saved.getAbout(), is(COMPANY_ABOUT));
    assertThat(saved.getSize(), is(COMPANY_SIZE));
    assertThat(saved.getProfileImageUrl(), is(COMPANY_PROFILE_IMAGE_URL));
    assertThat(saved.getCreatedOn(), is(LocalDate.now()));
    assertThat(saved.getOwner(), is(sameInstance(owner)));
    assertThat(saved.getId(), is(notNullValue()));
  }

  @Test
  void createUserWithCompanyGeneratesUuidCompanyId() {
    stubRequestFields();
    when(companyRepository.save(any(CompanyEntity.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));
    ArgumentCaptor<CompanyEntity> companyCaptor = ArgumentCaptor.forClass(CompanyEntity.class);

    companyService.createUserWithCompany(USER_ID, request);

    verify(companyRepository).save(companyCaptor.capture());
    assertThat(UUID.fromString(companyCaptor.getValue().getId()), is(notNullValue()));
  }

  @Test
  void createUserWithCompanyReturnsEntityProducedByRepository() {
    stubRequestFields();
    CompanyEntity persisted = CompanyEntity.builder().id(COMPANY_NAME).build();
    when(companyRepository.save(any(CompanyEntity.class))).thenReturn(persisted);

    CompanyEntity result = companyService.createUserWithCompany(USER_ID, request);

    assertThat(result, is(sameInstance(persisted)));
  }

  @Test
  void createUserWithCompanyThrowsBadRequestWhenCompanyNameAlreadyExists() {
    when(request.getCompanyName()).thenReturn(COMPANY_NAME);
    when(companyRepository.existsByName(COMPANY_NAME)).thenReturn(true);

    BadRequestException exception = assertThrows(BadRequestException.class,
        () -> companyService.createUserWithCompany(USER_ID, request));
    assertThat(exception.getMessage(), containsString(COMPANY_NAME));
  }

  @Test
  void createUserWithCompanyDoesNotCreateOwnerOrPersistWhenCompanyNameAlreadyExists() {
    when(request.getCompanyName()).thenReturn(COMPANY_NAME);
    when(companyRepository.existsByName(COMPANY_NAME)).thenReturn(true);

    assertThrows(BadRequestException.class,
        () -> companyService.createUserWithCompany(USER_ID, request));

    verify(userService, never()).saveNewUser(any(), any(), any(), any(), any(), any(), any(), any(), any());
    verify(companyRepository, never()).save(any());
  }

  private void stubRequestFields() {
    when(request.getCompanyName()).thenReturn(COMPANY_NAME);
    when(request.getUserProfileImageUrl()).thenReturn(USER_PROFILE_IMAGE_URL);
    when(request.getCurrentPosition()).thenReturn(CURRENT_POSITION);
    when(request.getUserAbout()).thenReturn(USER_ABOUT);
    when(request.getLinkedinUrl()).thenReturn(LINKEDIN_URL);
    when(request.getBirthDate()).thenReturn(BIRTH_DATE);
    when(request.getCompanyAbout()).thenReturn(COMPANY_ABOUT);
    when(request.getCompanySize()).thenReturn(COMPANY_SIZE);
    when(request.getCompanyProfileImageUrl()).thenReturn(COMPANY_PROFILE_IMAGE_URL);
  }
}