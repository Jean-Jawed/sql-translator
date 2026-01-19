import { dialects } from '../../i18n/translations'

export function DialectSelect({ label, value, onChange, id }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {dialects.map(dialect => (
          <option key={dialect.value} value={dialect.value}>
            {dialect.label}
          </option>
        ))}
      </select>
    </div>
  )
}
