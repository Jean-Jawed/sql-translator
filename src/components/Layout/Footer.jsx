import { useLanguage } from '../../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-sm text-slate-500">
        <span>{t('footer')}</span>
        <a 
          href="https://github.com/tobymao/sqlglot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-slate-300 transition-colors"
        >
          {t('poweredBy')}
        </a>
      </div>
    </footer>
  )
}
