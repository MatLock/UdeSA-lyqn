import strings from '../../i18n'
import './StepIndicator.css'

// Shows how far through the register wizard the user is, e.g. "Paso 1 de 2".
// The total varies by account type (candidate = 2, company = 3) and is passed
// in by the wizard, which owns the step list.
const StepIndicator = ({ current, total, className = '' }) => {
  const text = strings.register.stepCounter
    .replace('{current}', current)
    .replace('{total}', total)

  return (
    <p className={`step-indicator ${className}`.trim()} aria-live="polite">
      {text}
    </p>
  )
}

export default StepIndicator
