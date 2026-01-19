import { useLanguage } from '../../i18n/LanguageContext'

export function SetValuesBuilder({ setValues, onAdd, onUpdate, onRemove }) {
  const { t } = useLanguage()

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-400">{t('setValues')}</h3>
        <button
          onClick={onAdd}
          className="btn btn-ghost btn-sm text-blue-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('addSetValue')}
        </button>
      </div>

      {setValues.length === 0 ? (
        <p className="text-sm text-slate-600 italic">No values set</p>
      ) : (
        setValues.map((sv, index) => (
          <div key={sv.id} className="flex items-end gap-2 mt-2 animate-slide-up">
            <div className="flex-1">
              {index === 0 && <label className="label">{t('setColumn')}</label>}
              <input
                type="text"
                value={sv.column}
                onChange={(e) => onUpdate(index, 'column', e.target.value)}
                placeholder={t('columnPlaceholder')}
              />
            </div>
            
            <div className="flex-1">
              {index === 0 && <label className="label">{t('setValue')}</label>}
              <input
                type="text"
                value={sv.value}
                onChange={(e) => onUpdate(index, 'value', e.target.value)}
                placeholder={t('valuePlaceholder')}
              />
            </div>
            
            <button
              onClick={() => onRemove(index)}
              className="btn btn-ghost btn-sm text-slate-500 hover:text-red-400"
              title={t('removeCondition')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))
      )}
    </div>
  )
}
