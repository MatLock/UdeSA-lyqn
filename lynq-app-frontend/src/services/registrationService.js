// Registration orchestration — composes the lynq-iam auth call with the
// lynq-backend-app profile/company calls.
//
// Both flows first create the auth identity (username/password/email) via
// authService, which returns an access token, then use that token to create the
// domain entity:
//   - candidate: POST /user            (UserController.createUser)
//   - company:   POST /company         (CompanyController.createUserWithCompany,
//                                        which creates the owner profile AND the
//                                        company in a single call)

import authService from './authService';

const APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL ?? 'http://localhost:8082/lynq-backend-app';

/**
 * POST to a secured app-backend endpoint with the bearer token and the required
 * `lynq-request-uuid` correlation header.
 *
 * @param {string} path - Endpoint path relative to the app-backend base URL.
 * @param {object} body - JSON request body.
 * @param {string} accessToken - Bearer access token from registration/login.
 * @returns {Promise<object>} The parsed response payload.
 * @throws {Error} On a non-OK response. Carries `status` and `reason`.
 */
const postSecured = async (path, body, accessToken) => {
  const response = await fetch(`${APP_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'lynq-request-uuid': crypto.randomUUID(),
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      payload?.reason ?? `Request failed with status ${response.status}`
    );
    error.status = response.status;
    error.reason = payload?.reason;
    throw error;
  }

  return payload;
};

/**
 * Register a candidate: create the auth user, then their user profile.
 *
 * @param {object} info
 * @param {string} info.username
 * @param {string} info.email
 * @param {string} info.password
 * @param {string} info.fullName
 * @param {string} info.birthDate - ISO date (yyyy-mm-dd).
 * @returns {Promise<object>} The auth response (with tokens).
 */
const register_candidate = async ({ username, email, password, fullName, birthDate }) => {
  const auth = await authService.user_register({ username, email, password });
  const accessToken = auth?.data?.accessToken;
  await postSecured('/user', { userType: 'CANDIDATE', fullName, birthDate }, accessToken);
  return auth;
};

/**
 * Register a company: create the auth user, then the owner profile + company
 * together (CompanyController.createUserWithCompany).
 *
 * @param {object} info - Auth, owner-profile and company fields.
 * @returns {Promise<object>} The auth response (with tokens).
 */
const register_company = async ({
  username,
  email,
  password,
  currentPosition,
  userAbout,
  birthDate,
  linkedinUrl,
  companyName,
  companyAbout,
  companySize,
  companyProfileImageUrl,
}) => {
  const auth = await authService.user_register({ username, email, password });
  const accessToken = auth?.data?.accessToken;
  await postSecured(
    '/company',
    {
      currentPosition,
      userAbout,
      birthDate,
      linkedinUrl,
      companyName,
      companyAbout,
      companySize,
      companyProfileImageUrl,
    },
    accessToken
  );
  return auth;
};

export default {
  register_candidate,
  register_company,
};
