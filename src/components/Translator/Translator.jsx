import { useLanguage } from '../../i18n/LanguageContext'
import { useTranslation } from '../../hooks/useTranslation'
import { DialectSelect } from '../UI/DialectSelect'
import { ResultDisplay } from '../UI/ResultDisplay'
import { LoadingSpinner } from '../UI/LoadingSpinner'

export function Translator() {
  const { t } = useLanguage()
  const {
    sql,
    setSql,
    sourceDialect,
    setSourceDialect,
    targetDialect,
    setTargetDialect,
    result,
    error,
    loading,
    translate,
    clear,
  } = useTranslation()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Dialect selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DialectSelect
          label={t('sourceDialect')}
          value={sourceDialect}
          onChange={setSourceDialect}
          id="sourceDialect"
        />
        
        <DialectSelect
          label={t('targetDialect')}
          value={targetDialect}
          onChange={setTargetDialect}
          id="targetDialect"
        />
      </div>

      {/* SQL Input */}
      <div>
        <label htmlFor="sqlInput" className="label">{t('sqlInput')}</label>
        <textarea
          id="sqlInput"
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder={t('sqlInputPlaceholder')}
          rows={8}
          className="font-mono text-sm resize-y"
          spellCheck={false}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={translate}
          disabled={loading || !sql.trim()}
          className="btn btn-primary"
        >
          {loading && <LoadingSpinner />}
          {t('translate')}
        </button>
        
        <button
          onClick={clear}
          className="btn btn-secondary"
        >
          {t('clear')}
        </button>
      </div>

      {/* Result */}
      <ResultDisplay result={result} error={error} />
    </div>
  )
}
