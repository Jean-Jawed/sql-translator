import { useLanguage } from '../../i18n/LanguageContext'
import { translations } from '../../i18n/translations'

export function Limitations() {
  const { t, language } = useLanguage()
  const limitationsList = translations[language]?.limitationsList || translations.en.limitationsList

  return (
    <div className="card p-5 bg-slate-50">
      <h3 className="text-sm font-medium text-slate-600 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {t('limitations')}
      </h3>
      <p className="text-sm text-slate-500 mb-3">
        {t('limitationsText')}
      </p>
      <ul className="text-sm text-slate-500 space-y-1.5">
        {limitationsList.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
