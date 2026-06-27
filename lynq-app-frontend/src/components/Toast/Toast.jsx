import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import strings from '../../i18n'
import './Toast.css'

const Toast = ({
  message,
  type = 'error',
  duration = 4000,
  onClose,
  closeLabel = strings.common.close,
}) => {
  useEffect(() => {
    if (!message || !duration) return
    const timer = setTimeout(() => onClose?.(), duration)
    return () => clearTimeout(timer)
  }, [message, duration, onClose])

  if (!message) return null

  // Portal to <body> so the fixed-position toast isn't positioned/clipped by a
  // transformed, overflow-hidden ancestor (e.g. the register carousel track).
  return createPortal(
    <div className={`toast toast-${type}`} role="alert">
      <span className="toast-message">{message}</span>
      <button
        type="button"
        className="toast-close"
        aria-label={closeLabel}
        onClick={() => onClose?.()}
      >
        ×
      </button>
    </div>,
    document.body,
  )
}

export default Toast
