import { useLanguage } from '../../i18n/LanguageContext'

export function Header() {
  const { t, language, toggleLanguage } = useLanguage()

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
            {t('title')}
          </h1>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            {t('tagline')}
          </span>
        </div>
        
        <button
          onClick={toggleLanguage}
          className="btn btn-ghost btn-sm font-mono text-xs"
          aria-label="Toggle language"
        >
          {language === 'en' ? 'FR' : 'EN'}
        </button>
      </div>
    </header>
  )
}
