import './AuthHeading.css'

// Static title + subtitle for the auth screens. Rendered once outside the
// register carousel so it stays fixed while the steps slide beneath it.
const AuthHeading = ({ title, subtitle }) => (
  <header className="auth-heading">
    <h1 className="auth-heading-title">{title}</h1>
    {subtitle && <p className="auth-heading-subtitle">{subtitle}</p>}
  </header>
)

export default AuthHeading
