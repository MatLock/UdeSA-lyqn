import { useEffect, useRef, useState } from 'react'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import useRegister from '../../hooks/useRegister'
import useRegisterSubmit from '../../hooks/useRegisterSubmit'
import registrationService from '../../services/registrationService'
import Toast from '../Toast/Toast'
import strings from '../../i18n'
import './CompanyDetailsStep.css'

// Company final step (step 4): the company fields. The auth credentials and
// owner profile were collected and persisted by the earlier steps, so this step
// adds the company details and submits the whole registration (auth user +
// owner profile + company) via registrationService.register_company.
const CompanyDetailsStep = ({ active }) => {
  const t = strings.register
  const cd = t.companyDetails
  const { data, updateData, back, setFooter } = useRegister()
  const { submitting, toast, setToast, run } = useRegisterSubmit()

  const [companyName, setCompanyName] = useState(data.companyName || '')
  const [companyAbout, setCompanyAbout] = useState(data.companyAbout || '')
  const [companySize, setCompanySize] = useState(data.companySize || '')
  const [companyProfileImageUrl, setCompanyProfileImageUrl] = useState(
    data.companyProfileImageUrl || '',
  )
  const [fieldErrors, setFieldErrors] = useState({})

  const validate = () => {
    const errors = {}
    if (!companyName.trim()) errors.companyName = cd.errors.nameRequired
    if (!companyAbout.trim()) errors.companyAbout = cd.errors.aboutRequired
    const size = Number(companySize)
    if (!companySize) errors.companySize = cd.errors.sizeRequired
    else if (!Number.isInteger(size) || size <= 0) errors.companySize = cd.errors.sizeInvalid
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submit = () => {
    if (!validate()) return
    updateData({ companyName, companyAbout, companySize, companyProfileImageUrl })
    // Credentials + owner profile come from wizard state set by the prior steps.
    run(() =>
      registrationService.register_company({
        username: data.username,
        email: data.email,
        password: data.password,
        currentPosition: data.currentPosition,
        userAbout: data.userAbout,
        birthDate: data.dob,
        linkedinUrl: data.linkedinUrl || undefined,
        companyName,
        companyAbout,
        companySize: Number(companySize),
        companyProfileImageUrl: companyProfileImageUrl || undefined,
      }),
    )
  }

  // Live reference so the footer button always runs the latest closure.
  const submitRef = useRef(submit)
  useEffect(() => {
    submitRef.current = submit
  })

  useEffect(() => {
    if (!active) return
    setFooter({
      secondary: { label: t.back, onClick: back, disabled: submitting },
      primary: {
        label: t.details.submit,
        disabled: submitting,
        onClick: () => submitRef.current(),
      },
    })
  }, [active, submitting, back, setFooter, t.back, t.details.submit])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    submit()
  }

  return (
    <div className="company-step">
      <form className="company-form" onSubmit={handleFormSubmit} noValidate>
        <div className="company-field">
          <label htmlFor="reg-company-name">{cd.nameLabel}</label>
          <div className="company-control">
            <span className="company-field-icon tone-blue">
              <ApartmentRoundedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-company-name"
              placeholder={cd.namePlaceholder}
              value={companyName}
              aria-invalid={Boolean(fieldErrors.companyName)}
              onChange={(event) => setCompanyName(event.target.value)}
            />
          </div>
          {fieldErrors.companyName && (
            <p className="company-error" role="alert">{fieldErrors.companyName}</p>
          )}
        </div>

        <div className="company-field">
          <label htmlFor="reg-company-about">{cd.aboutLabel}</label>
          <div className="company-control">
            <span className="company-field-icon tone-purple">
              <InfoOutlinedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-company-about"
              placeholder={cd.aboutPlaceholder}
              value={companyAbout}
              aria-invalid={Boolean(fieldErrors.companyAbout)}
              onChange={(event) => setCompanyAbout(event.target.value)}
            />
          </div>
          {fieldErrors.companyAbout && (
            <p className="company-error" role="alert">{fieldErrors.companyAbout}</p>
          )}
        </div>

        <div className="company-field">
          <label htmlFor="reg-company-size">{cd.sizeLabel}</label>
          <div className="company-control">
            <span className="company-field-icon tone-blue">
              <GroupsOutlinedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-company-size"
              type="number"
              min="1"
              step="1"
              placeholder={cd.sizePlaceholder}
              value={companySize}
              aria-invalid={Boolean(fieldErrors.companySize)}
              onChange={(event) => setCompanySize(event.target.value)}
            />
          </div>
          {fieldErrors.companySize && (
            <p className="company-error" role="alert">{fieldErrors.companySize}</p>
          )}
        </div>

        <div className="company-field">
          <label htmlFor="reg-company-logo">{cd.logoLabel}</label>
          <div className="company-control">
            <span className="company-field-icon tone-purple">
              <ImageOutlinedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              id="reg-company-logo"
              type="url"
              placeholder={cd.logoPlaceholder}
              value={companyProfileImageUrl}
              onChange={(event) => setCompanyProfileImageUrl(event.target.value)}
            />
          </div>
        </div>

        {/* Hidden submit keeps Enter-to-submit working; visible buttons are in
            the static RegisterFooter. */}
        <button type="submit" className="company-hidden-submit" aria-hidden="true" tabIndex={-1} />
      </form>

      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  )
}

export default CompanyDetailsStep
