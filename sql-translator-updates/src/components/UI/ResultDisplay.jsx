import { useState, useCallback } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

export function ResultDisplay({ result, error }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    if (!result) return
    
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [result])

  if (error) {
    return (
      <div className="mt-6 animate-fade-in">
        <label className="label">{t('errorTitle')}</label>
        <div className="error-message">
          {t(error) || error}
        </div>
      </div>
    )
  }

  if (!result) return null

  return (
    <div className="mt-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <label className="label mb-0">{t('result')}</label>
        <button
          onClick={copyToClipboard}
          className={`btn btn-secondary btn-sm ${copied ? 'copy-success' : ''}`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('copied')}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {t('copy')}
            </>
          )}
        </button>
      </div>
      <div className="code-block">
        {result}
      </div>
    </div>
  )
}
