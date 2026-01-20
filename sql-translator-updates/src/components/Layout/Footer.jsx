import { useLanguage } from '../../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-sm text-slate-500">
        <span>
          © 2025 Jawed Tahir — <a 
            href="https://jawed.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            jawed.fr
          </a>
        </span>
        <a 
          href="https://github.com/tobymao/sqlglot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-slate-700 transition-colors"
        >
          {t('poweredBy')}
        </a>
      </div>
    </footer>
  )
}
