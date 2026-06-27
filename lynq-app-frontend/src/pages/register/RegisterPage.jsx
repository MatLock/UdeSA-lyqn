import strings from '../../i18n'
import AuthHeading from '../../components/AuthHeading/AuthHeading'
import RegisterWizard from '../../components/RegisterWizard/RegisterWizard'
import RegisterFooter from '../../components/RegisterFooter/RegisterFooter'
import './RegisterPage.css'


const RegisterPage = () => {
  const t = strings.register

  return (
    <div className="register-bg">
      <div className="register-dots register-dots-tr" />
      <div className="register-dots register-dots-bl" />

      <main className="register-card">
        <span className="register-logo">LYNQ</span>
        <AuthHeading title={t.title} />

        <RegisterWizard />
        <RegisterFooter />
      </main>
    </div>
  )
}

export default RegisterPage
