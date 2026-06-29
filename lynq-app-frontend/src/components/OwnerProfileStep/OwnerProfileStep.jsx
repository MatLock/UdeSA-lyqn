import { useEffect, useRef, useState } from 'react'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import useRegister from '../../hooks/useRegister'
import urlUtils from '../../utils/url'
import StepIndicator from '../StepIndicator/StepIndicator'
import strings from '../../i18n'
import './OwnerProfileStep.css'

// Company step 3: the owner's profile fields required by the company endpoint
// (CreateUserWithCompanyRequest). Persists to wizard state and advances to the
// company-details step, which performs the final submit.
const OwnerProfileStep = ({ active, stepNumber, totalSteps }) => {
  const t = strings.register
  const op = t.ownerProfile
  const { data, updateData, next, back, setFooter } = useRegister()

  const [currentPosition, setCurrentPosition] = useState(data.currentPosition || '')
  const [userAbout, setUserAbout] = useState(data.userAbout || '')
  const [linkedinUrl, setLinkedinUrl] = useState(data.linkedinUrl || '')
  const [fieldErrors, setFieldErrors] = useState({})

  const validate = () => {
    const errors = {}
    if (!currentPosition.trim()) errors.currentPosition = op.errors.positionRequired
    if (!userAbout.trim()) errors.userAbout = op.errors.aboutRequired
    // LinkedIn is optional, but if provided it must be a valid URL.
    if (linkedinUrl.trim() && !urlUtils.isValidUrl(linkedinUrl.trim()))
      errors.linkedinUrl = op.errors.linkedinInvalid
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const advance = () => {
    if (!validate()) return
    updateData({ currentPosition, userAbout, linkedinUrl })
    next()
  }

  const advanceRef = useRef(advance)
  useEffect(() => {
    advanceRef.current = advance
  })

  useEffect(() => {
    if (!active) return
    setFooter({
      secondary: { label: t.back, onClick: back },
      primary: { label: t.next, onClick: () => advanceRef.current() },
    })
  }, [active, back, setFooter, t.back, t.next])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    advanceRef.current()
  }

  return (
    <div className="owner-step">
      <StepIndicator
        current={stepNumber}
        total={totalSteps}
        className="step-indicator--end"
      />
      <form className="owner-form" onSubmit={handleFormSubmit} noValidate>
        <div className="owner-field">
          <label htmlFor="reg-position">{op.positionLabel}</label>
          <div className="owner-control">
            <span className="owner-field-icon tone-blue">
              <BadgeOutlinedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-position"
              placeholder={op.positionPlaceholder}
              value={currentPosition}
              aria-invalid={Boolean(fieldErrors.currentPosition)}
              onChange={(event) => setCurrentPosition(event.target.value)}
            />
          </div>
          {fieldErrors.currentPosition && (
            <p className="owner-error" role="alert">{fieldErrors.currentPosition}</p>
          )}
        </div>

        <div className="owner-field">
          <label htmlFor="reg-user-about">{op.aboutLabel}</label>
          <div className="owner-control">
            <span className="owner-field-icon tone-purple">
              <InfoOutlinedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-user-about"
              placeholder={op.aboutPlaceholder}
              value={userAbout}
              aria-invalid={Boolean(fieldErrors.userAbout)}
              onChange={(event) => setUserAbout(event.target.value)}
            />
          </div>
          {fieldErrors.userAbout && (
            <p className="owner-error" role="alert">{fieldErrors.userAbout}</p>
          )}
        </div>

        <div className="owner-field">
          <label htmlFor="reg-linkedin">{op.linkedinLabel}</label>
          <div className="owner-control">
            <span className="owner-field-icon tone-blue">
              <LinkedInIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-linkedin"
              type="url"
              placeholder={op.linkedinPlaceholder}
              value={linkedinUrl}
              aria-invalid={Boolean(fieldErrors.linkedinUrl)}
              onChange={(event) => setLinkedinUrl(event.target.value)}
            />
          </div>
          {fieldErrors.linkedinUrl && (
            <p className="owner-error" role="alert">{fieldErrors.linkedinUrl}</p>
          )}
        </div>

        {/* Hidden submit keeps Enter-to-advance working; visible buttons are in
            the static RegisterFooter. */}
        <button type="submit" className="owner-hidden-submit" aria-hidden="true" tabIndex={-1} />
      </form>
    </div>
  )
}

export default OwnerProfileStep
