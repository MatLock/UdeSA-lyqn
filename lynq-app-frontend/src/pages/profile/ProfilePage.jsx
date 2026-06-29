import { useState } from 'react'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import DatePicker from '../../components/DatePicker/DatePicker'
import strings from '../../i18n'
import './ProfilePage.css'

// User profile editor. Fields mirror the backend UpdateUserProfileRequest
// (fullName, userProfileImageUrl, currentPosition, about, githubUrl,
// linkedinUrl, birthDate) plus password. Values are bound to local state here;
// the call to the backend update service will be wired in later.
const ProfilePage = () => {
  const t = strings.pages.profile

  const [fullName, setFullName] = useState('')
  // userProfileImageUrl — kept as a link for now; file upload comes later.
  const [profileImageUrl, setProfileImageUrl] = useState('')
  const [currentPosition, setCurrentPosition] = useState('')
  const [about, setAbout] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Require the confirmation to match before changing the password.
    if (password !== confirmPassword) {
      setPasswordError(t.passwordMismatch)
      return
    }
    setPasswordError('')
    // TODO: wire to the backend update-profile service (provided later). Every
    // field above is already bound to local state and ready to submit as the
    // UpdateUserProfileRequest shape.
  }

  return (
    <div className="login-bg profile-page">
      <div className="login-dots login-dots-tl" />
      <div className="login-dots login-dots-br" />

      <main className="login-card profile-card">
        <h1 className="login-title">{t.title}</h1>
        <p className="login-subtitle">{t.subtitle}</p>

        <form className="profile-form" onSubmit={handleSubmit} noValidate>
          <div className="profile-field">
            <label htmlFor="profile-fullname">{t.fullNameLabel}</label>
            <div className="profile-control">
              <span className="profile-field-icon tone-blue">
                <PersonOutlineRoundedIcon sx={{ fontSize: 18 }} />
              </span>
              <input
                id="profile-fullname"
                placeholder={t.fullNamePlaceholder}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-image">{t.imageLabel}</label>
            <div className="profile-control">
              <span className="profile-field-icon tone-purple">
                <ImageOutlinedIcon sx={{ fontSize: 18 }} />
              </span>
              <input
                id="profile-image"
                type="url"
                placeholder={t.imagePlaceholder}
                value={profileImageUrl}
                onChange={(event) => setProfileImageUrl(event.target.value)}
              />
            </div>
            <p className="profile-hint">{t.imageHint}</p>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-position">{t.positionLabel}</label>
            <div className="profile-control">
              <span className="profile-field-icon tone-blue">
                <BadgeOutlinedIcon sx={{ fontSize: 18 }} />
              </span>
              <input
                id="profile-position"
                placeholder={t.positionPlaceholder}
                value={currentPosition}
                onChange={(event) => setCurrentPosition(event.target.value)}
              />
            </div>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-about">{t.aboutLabel}</label>
            <div className="profile-control profile-control--textarea">
              <span className="profile-field-icon tone-purple">
                <InfoOutlinedIcon sx={{ fontSize: 18 }} />
              </span>
              <textarea
                id="profile-about"
                className="profile-textarea"
                rows={5}
                placeholder={t.aboutPlaceholder}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-github">{t.githubLabel}</label>
            <div className="profile-control">
              <span className="profile-field-icon tone-blue">
                <GitHubIcon sx={{ fontSize: 18 }} />
              </span>
              <input
                id="profile-github"
                type="url"
                placeholder={t.githubPlaceholder}
                value={githubUrl}
                onChange={(event) => setGithubUrl(event.target.value)}
              />
            </div>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-linkedin">{t.linkedinLabel}</label>
            <div className="profile-control">
              <span className="profile-field-icon tone-purple">
                <LinkedInIcon sx={{ fontSize: 18 }} />
              </span>
              <input
                id="profile-linkedin"
                type="url"
                placeholder={t.linkedinPlaceholder}
                value={linkedinUrl}
                onChange={(event) => setLinkedinUrl(event.target.value)}
              />
            </div>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-birthdate">{t.birthDateLabel}</label>
            <div className="profile-control">
              <span className="profile-field-icon tone-blue">
                <CakeOutlinedIcon sx={{ fontSize: 18 }} />
              </span>
              <DatePicker
                id="profile-birthdate"
                value={birthDate}
                onChange={setBirthDate}
                placeholder={t.birthDatePlaceholder}
                disableFuture
              />
            </div>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-password">{t.passwordLabel}</label>
            <div className="profile-control">
              <span className="profile-field-icon tone-purple">
                <LockOutlinedIcon sx={{ fontSize: 18 }} />
              </span>
              <div className="profile-input-wrap">
                <input
                  id="profile-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="profile-eye"
                  aria-label={showPassword ? strings.login.hidePassword : strings.login.showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                  )}
                </button>
              </div>
            </div>
            <p className="profile-hint">{t.passwordHint}</p>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-confirm-password">{t.confirmPasswordLabel}</label>
            <div className="profile-control">
              <span className="profile-field-icon tone-blue">
                <LockOutlinedIcon sx={{ fontSize: 18 }} />
              </span>
              <input
                id="profile-confirm-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t.confirmPasswordPlaceholder}
                value={confirmPassword}
                aria-invalid={Boolean(passwordError)}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            {passwordError && (
              <p className="profile-error" role="alert">{passwordError}</p>
            )}
          </div>

          <button type="submit" className="profile-save">{t.save}</button>
        </form>
      </main>
    </div>
  )
}

export default ProfilePage
