import { useEffect, useRef, useState } from 'react'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import useRegister from '../../hooks/useRegister'
import useRegisterSubmit from '../../hooks/useRegisterSubmit'
import registrationService from '../../services/registrationService'
import DatePicker from '../DatePicker/DatePicker'
import Toast from '../Toast/Toast'
import StepIndicator from '../StepIndicator/StepIndicator'
import strings from '../../i18n'
import './DetailsStep.css'

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

// The shared "user form" — same fields for candidates and companies. It is the
// final step for candidates (submits the registration) and an intermediate step
// for companies (advances to the owner/company steps). Wizard state lives in
// RegisterContext, so values persist while sliding between steps.
const DetailsStep = ({ active, isLast, stepNumber, totalSteps }) => {
  const t = strings.register
  const td = t.details
  const { data, updateData, next, back, setFooter } = useRegister()
  const { submitting, toast, setToast, run } = useRegisterSubmit()

  const [name, setName] = useState(data.name || '')
  const [username, setUsername] = useState(data.username || '')
  const [dob, setDob] = useState(data.dob || '')
  const [email, setEmail] = useState(data.email || '')
  const [password, setPassword] = useState(data.password || '')
  const [confirm, setConfirm] = useState(data.password || '')
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const validate = () => {
    const errors = {}
    if (!name.trim()) errors.name = td.errors.nameRequired
    if (!username.trim()) errors.username = td.errors.usernameRequired
    else if (username.trim().length < 3 || username.trim().length > 20)
      errors.username = td.errors.usernameLength
    // Birth date expected as yyyy-mm-dd and not in the future.
    if (!dob) errors.dob = td.errors.dobRequired
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob) || Number.isNaN(new Date(dob).getTime()))
      errors.dob = td.errors.dobInvalid
    else if (new Date(dob) > new Date()) errors.dob = td.errors.dobInvalid
    if (!email.trim()) errors.email = td.errors.emailRequired
    else if (!isEmail(email.trim())) errors.email = td.errors.emailInvalid
    if (!password) errors.password = td.errors.passwordRequired
    else if (password.length < 8) errors.password = td.errors.passwordTooShort
    if (confirm !== password) errors.confirm = td.errors.confirmMismatch
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const persist = () => updateData({ name, username, dob, email, password })

  // Candidates finish here (create the auth user + candidate profile); companies
  // advance to the owner/company steps.
  const runPrimary = () => {
    if (!validate()) return
    persist()
    if (isLast) {
      run(() =>
        registrationService.register_candidate({
          username,
          email,
          password,
          fullName: name,
          birthDate: dob,
        }),
      )
    } else {
      next()
    }
  }

  // Keep a live reference so the footer button (registered once below) always
  // runs the latest closure with current field values.
  const primaryActionRef = useRef(runPrimary)
  useEffect(() => {
    primaryActionRef.current = runPrimary
  })

  // Drive the shared footer while this is the active step. The primary action is
  // "Crear cuenta" (submit) on the last step, otherwise "Siguiente" (advance).
  useEffect(() => {
    if (!active) return
    setFooter({
      secondary: { label: t.back, onClick: back, disabled: submitting },
      primary: {
        label: isLast ? td.submit : t.next,
        disabled: submitting,
        onClick: () => primaryActionRef.current(),
      },
    })
  }, [active, isLast, submitting, back, setFooter, t.back, t.next, td.submit])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    primaryActionRef.current()
  }

  return (
    <div className="details-step">
      <StepIndicator
        current={stepNumber}
        total={totalSteps}
        className="step-indicator--end"
      />
      <form className="details-form" onSubmit={handleFormSubmit} noValidate>
        <div className="details-field">
          <label htmlFor="reg-name">{td.nameLabel}</label>
          <div className="details-control">
            <span className="details-field-icon tone-blue">
              <PersonOutlineRoundedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-name"
              placeholder={td.namePlaceholder}
              value={name}
              aria-invalid={Boolean(fieldErrors.name)}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          {fieldErrors.name && (
            <p className="details-error" role="alert">{fieldErrors.name}</p>
          )}
        </div>

        <div className="details-field">
          <label htmlFor="reg-username">{td.usernameLabel}</label>
          <div className="details-control">
            <span className="details-field-icon tone-purple">
              <BadgeOutlinedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-username"
              placeholder={td.usernamePlaceholder}
              value={username}
              aria-invalid={Boolean(fieldErrors.username)}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          {fieldErrors.username && (
            <p className="details-error" role="alert">{fieldErrors.username}</p>
          )}
        </div>

        <div className="details-field">
          <label htmlFor="reg-dob">{td.dobLabel}</label>
          <div className="details-control">
            <span className="details-field-icon tone-blue">
              <CakeOutlinedIcon sx={{ fontSize: 18 }} />
            </span>
            <DatePicker
              id="reg-dob"
              value={dob}
              onChange={setDob}
              placeholder={td.dobPlaceholder}
              ariaInvalid={Boolean(fieldErrors.dob)}
              disableFuture
            />
          </div>
          {fieldErrors.dob && (
            <p className="details-error" role="alert">{fieldErrors.dob}</p>
          )}
        </div>

        <div className="details-field">
          <label htmlFor="reg-email">{td.emailLabel}</label>
          <div className="details-control">
            <span className="details-field-icon tone-blue">
              <MailOutlineRoundedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-email"
              type="email"
              placeholder={td.emailPlaceholder}
              value={email}
              aria-invalid={Boolean(fieldErrors.email)}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          {fieldErrors.email && (
            <p className="details-error" role="alert">{fieldErrors.email}</p>
          )}
        </div>

        <div className="details-field">
          <label htmlFor="reg-password">{td.passwordLabel}</label>
          <div className="details-control">
            <span className="details-field-icon tone-purple">
              <LockOutlinedIcon sx={{ fontSize: 18 }} />
            </span>
            <div className="details-input-wrap">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={td.passwordPlaceholder}
                value={password}
                aria-invalid={Boolean(fieldErrors.password)}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="details-eye"
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
          {fieldErrors.password && (
            <p className="details-error" role="alert">{fieldErrors.password}</p>
          )}
        </div>

        <div className="details-field">
          <label htmlFor="reg-confirm">{td.confirmLabel}</label>
          <div className="details-control">
            <span className="details-field-icon tone-blue">
              <LockOutlinedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-confirm"
              type={showPassword ? 'text' : 'password'}
              placeholder={td.confirmPlaceholder}
              value={confirm}
              aria-invalid={Boolean(fieldErrors.confirm)}
              onChange={(event) => setConfirm(event.target.value)}
            />
          </div>
          {fieldErrors.confirm && (
            <p className="details-error" role="alert">{fieldErrors.confirm}</p>
          )}
        </div>

        {/* Hidden submit keeps Enter-to-submit working; the visible action
            buttons live in the static RegisterFooter. */}
        <button type="submit" className="details-hidden-submit" aria-hidden="true" tabIndex={-1} />
      </form>

      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  )
}

export default DetailsStep
