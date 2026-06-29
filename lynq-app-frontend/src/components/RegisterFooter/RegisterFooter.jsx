import { useNavigate } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import useRegister from '../../hooks/useRegister'
import strings from '../../i18n'
import './RegisterFooter.css'

// Static footer for the register flow. It sits below the carousel viewport (not
// inside the sliding track), so it stays put across navigation while the active
// step supplies its buttons via context.footer. The back-to-login link always
// shows so a mis-click from the login page is recoverable on any step.
const RegisterFooter = () => {
  const { footer } = useRegister()
  const navigate = useNavigate()
  const t = strings.register

  const { primary, secondary } = footer ?? {}

  return (
    <footer className="register-footer">
      {primary && (
        <div className="register-footer-actions">
          {secondary && (
            <button
              type="button"
              className="register-footer-back"
              onClick={secondary.onClick}
              disabled={secondary.disabled}
            >
              <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
              {secondary.label}
            </button>
          )}
          <button
            type="button"
            className="register-footer-next"
            onClick={primary.onClick}
            disabled={primary.disabled}
          >
            {primary.label}
            <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      )}
      <button
        type="button"
        className="register-footer-login"
        onClick={() => navigate('/')}
      >
        {t.backToLogin}
      </button>
    </footer>
  )
}

export default RegisterFooter
