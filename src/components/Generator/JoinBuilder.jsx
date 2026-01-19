import { useLanguage } from '../../i18n/LanguageContext'
import { joinTypes } from '../../i18n/translations'

export function JoinBuilder({ joins, onAdd, onUpdate, onRemove }) {
  const { t } = useLanguage()

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-400">{t('joins')}</h3>
        <button
          onClick={onAdd}
          className="btn btn-ghost btn-sm text-blue-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('addJoin')}
        </button>
      </div>

      {joins.length === 0 ? (
        <p className="text-sm text-slate-600 italic">No joins</p>
      ) : (
        joins.map((join, index) => (
          <div key={join.id} className="flex flex-wrap items-end gap-2 mt-2 animate-slide-up">
            <div className="w-32">
              {index === 0 && <label className="label">{t('joinType')}</label>}
              <select
                value={join.type}
                onChange={(e) => onUpdate(index, 'type', e.target.value)}
              >
                {joinTypes.map(jt => (
                  <option key={jt.value} value={jt.value}>{jt.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 min-w-[120px]">
              {index === 0 && <label className="label">{t('joinTable')}</label>}
              <input
                type="text"
                value={join.table}
                onChange={(e) => onUpdate(index, 'table', e.target.value)}
                placeholder={t('joinTablePlaceholder')}
              />
            </div>
            
            <div className="flex-[2] min-w-[200px]">
              {index === 0 && <label className="label">{t('joinOn')}</label>}
              <input
                type="text"
                value={join.on}
                onChange={(e) => onUpdate(index, 'on', e.target.value)}
                placeholder={t('joinOnPlaceholder')}
              />
            </div>
            
            <button
              onClick={() => onRemove(index)}
              className="btn btn-ghost btn-sm text-slate-500 hover:text-red-400"
              title={t('removeJoin')}
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
