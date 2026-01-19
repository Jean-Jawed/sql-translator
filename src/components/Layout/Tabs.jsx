import { useLanguage } from '../../i18n/LanguageContext'

export function Tabs({ activeTab, onTabChange }) {
  const { t } = useLanguage()

  return (
    <div className="flex border-b border-slate-800">
      <button
        className={`tab ${activeTab === 'generator' ? 'active' : ''}`}
        onClick={() => onTabChange('generator')}
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('generator')}
        </span>
      </button>
      <button
        className={`tab ${activeTab === 'translator' ? 'active' : ''}`}
        onClick={() => onTabChange('translator')}
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          {t('translator')}
        </span>
      </button>
    </div>
  )
}
