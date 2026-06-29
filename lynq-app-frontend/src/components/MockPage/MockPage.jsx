import './MockPage.css'

const MockPage = ({ title, subtitle, children }) => (
  <div className="login-bg mock-page">
    <div className="login-dots login-dots-tl" />
    <div className="login-dots login-dots-br" />

    <main className="login-card mock-card">
      <h1 className="login-title">{title}</h1>
      <p className="login-subtitle">{subtitle}</p>
      {children}
    </main>
  </div>
)

export default MockPage
