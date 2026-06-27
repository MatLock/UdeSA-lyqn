import { useEffect, useState } from 'react'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import strings from '../../i18n'
import useRegister from '../../hooks/useRegister'
import './AccountTypeStep.css'

const AccountTypeStep = ({ active }) => {
  const t = strings.register
  const { data, updateData, next, setFooter } = useRegister()
  const [accountType, setAccountType] = useState(data.accountType || '')

  const options = [
    {
      value: 'candidate',
      tone: 'blue',
      title: t.accountType.candidate,
      description: t.accountType.candidateDesc,
      Icon: PersonOutlineRoundedIcon,
    },
    {
      value: 'company',
      tone: 'purple',
      title: t.accountType.company,
      description: t.accountType.companyDesc,
      Icon: ApartmentRoundedIcon,
    },
  ]

  // Drive the shared footer while this is the active step. Re-runs when the
  // selection changes so the Next button's enabled state stays in sync.
  useEffect(() => {
    if (!active) return
    setFooter({
      primary: {
        label: t.next,
        disabled: !accountType,
        onClick: () => {
          if (!accountType) return
          updateData({ accountType })
          next()
        },
      },
    })
  }, [active, accountType, updateData, next, setFooter, t.next])

  return (
    <div className="account-type-step">
      <p className="account-type-question">{t.accountType.question}</p>
      <p className="account-type-helper">{t.accountType.helper}</p>

      <div className="account-type-options">
        {options.map(({ value, tone, title, description, Icon }) => {
          const selected = accountType === value
          return (
            <label
              key={value}
              className={
                selected
                  ? `account-type-card tone-${tone} selected`
                  : `account-type-card tone-${tone}`
              }
            >
              <input
                type="radio"
                name="accountType"
                value={value}
                checked={selected}
                onChange={(event) => {
                  setAccountType(event.target.value)
                  // Persist immediately so the step counter (2 vs 3) reflects the
                  // choice right away, before advancing.
                  updateData({ accountType: event.target.value })
                }}
              />
              <span className="account-type-radio" aria-hidden="true" />
              <span className="account-type-icon">
                <Icon sx={{ fontSize: 34 }} />
              </span>
              <span className="account-type-card-title">{title}</span>
              <span className="account-type-card-desc">{description}</span>
            </label>
          )
        })}
      </div>

      <hr className="account-type-divider" />

      <p className="account-type-note">
        <LockOutlinedIcon sx={{ fontSize: 16 }} />
        {t.accountType.changeNote}
      </p>
    </div>
  )
}

export default AccountTypeStep
