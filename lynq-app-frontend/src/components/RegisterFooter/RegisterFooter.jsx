import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import useRegister from '../../hooks/useRegister'
import './RegisterFooter.css'

// Static footer for the register flow. It sits below the carousel viewport (not
// inside the sliding track), so it stays put across navigation while the active
// step supplies its buttons via context.footer.
const RegisterFooter = () => {
  const { footer } = useRegister()
  if (!footer?.primary) return null

  const { primary, secondary } = footer

  return (
    <footer className="register-footer">
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
    </footer>
  )
}

export default RegisterFooter
