import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import strings from '../i18n'

// Drives the final registration submit from whichever step is last (DetailsStep
// for candidates, CompanyDetailsStep for companies). Centralizes the submitting
// flag, error toast and post-success navigation; the caller supplies the actual
// async action (e.g. registrationService.register_candidate / register_company).
const useRegisterSubmit = () => {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  // Returns true on success, false if the action threw.
  const run = async (action) => {
    setToast(null)
    setSubmitting(true)
    try {
      await action()
      navigate('/')
      return true
    } catch (err) {
      setToast(err?.message || strings.login.errors.registerFailed)
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return { submitting, toast, setToast, run }
}

export default useRegisterSubmit
