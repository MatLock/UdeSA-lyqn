package com.lynq.backend.controller.impl;

import com.lynq.backend.controller.request.CreateUserWithCompanyRequest;
import com.lynq.backend.controller.response.CreateUserWithCompanyRestResponse;
import com.lynq.backend.controller.response.GlobalRestResponse;
import com.lynq.backend.model.CompanyEntity;
import com.lynq.backend.model.UserEntity;
import com.lynq.backend.security.LynqUserPrincipal;
import com.lynq.backend.service.CompanyService;
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
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CompanyControllerImplTest {

  private static final String USER_ID = "550e8400-e29b-41d4-a716-446655440000";
  private static final String COMPANY_ID = "018f9c3a-2b1d-7c4e-9a6f-1e2d3c4b5a60";
  private static final String COMPANY_NAME = "Lynq Technologies";
  private static final String COMPANY_ABOUT = "We build talent matching platforms.";
  private static final Integer COMPANY_SIZE = 250;
  private static final String COMPANY_PROFILE_IMAGE_URL = "https://cdn.lynq.com/logos/lynq.png";
  private static final LocalDate CREATED_ON = LocalDate.of(2026, 6, 25);

  @Mock
  private CompanyService companyService;

  @Mock
  private CreateUserWithCompanyRequest request;

  @Mock
  private LynqUserPrincipal principal;

  private CompanyControllerImpl companyController;

  @BeforeEach
  void setUp() {
    companyController = new CompanyControllerImpl(companyService);
    when(principal.getId()).thenReturn(USER_ID);
    when(companyService.createUserWithCompany(USER_ID, request)).thenReturn(savedCompany());
  }

  @Test
  void createUserWithCompanyDelegatesToServiceWithPrincipalIdAndRequest() {
    companyController.createUserWithCompany(request, principal);

    verify(companyService).createUserWithCompany(USER_ID, request);
  }

  @Test
  void createUserWithCompanyRespondsWithCreatedStatus() {
    ResponseEntity<GlobalRestResponse<CreateUserWithCompanyRestResponse>> response =
        companyController.createUserWithCompany(request, principal);

    assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
  }

  @Test
  void createUserWithCompanyWrapsSuccessfulResponseBody() {
    ResponseEntity<GlobalRestResponse<CreateUserWithCompanyRestResponse>> response =
        companyController.createUserWithCompany(request, principal);

    GlobalRestResponse<CreateUserWithCompanyRestResponse> body = response.getBody();
    assertThat(body, is(notNullValue()));
    assertThat(body.isSuccess(), is(true));
  }

  @Test
  void createUserWithCompanyMapsSavedCompanyIntoResponseData() {
    ResponseEntity<GlobalRestResponse<CreateUserWithCompanyRestResponse>> response =
        companyController.createUserWithCompany(request, principal);

    CreateUserWithCompanyRestResponse data = response.getBody().getData();
    assertThat(data.getCompanyId(), is(COMPANY_ID));
    assertThat(data.getCompanyName(), is(COMPANY_NAME));
    assertThat(data.getCompanyAbout(), is(COMPANY_ABOUT));
    assertThat(data.getCompanySize(), is(COMPANY_SIZE));
    assertThat(data.getCompanyProfileImageUrl(), is(COMPANY_PROFILE_IMAGE_URL));
    assertThat(data.getCompanyCreatedOn(), is(CREATED_ON));
    assertThat(data.getOwnerUserId(), is(USER_ID));
  }

  private CompanyEntity savedCompany() {
    return CompanyEntity.builder()
        .id(COMPANY_ID)
        .name(COMPANY_NAME)
        .about(COMPANY_ABOUT)
        .size(COMPANY_SIZE)
        .profileImageUrl(COMPANY_PROFILE_IMAGE_URL)
        .createdOn(CREATED_ON)
        .owner(UserEntity.builder().id(USER_ID).build())
        .build();
  }
}