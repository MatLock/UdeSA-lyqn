import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LoginPage from './pages/login/LoginPage.jsx'
import RegisterProvider from './context/RegisterContext.jsx'
import RegisterPage from './pages/register/RegisterPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* The register flow is an in-place carousel: a single /register route
            wraps the wizard, which slides between steps without changing URL. */}
        <Route
          path="/register"
          element={
            <RegisterProvider>
              <RegisterPage />
            </RegisterProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
