import { useLanguage } from '../../i18n/LanguageContext'

export function OrderByBuilder({ orderBy, onAdd, onUpdate, onRemove }) {
  const { t } = useLanguage()

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-400">{t('orderBy')}</h3>
        <button
          onClick={onAdd}
          className="btn btn-ghost btn-sm text-blue-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('addOrderBy')}
        </button>
      </div>

      {orderBy.length === 0 ? (
        <p className="text-sm text-slate-600 italic">No sorting</p>
      ) : (
        orderBy.map((ob, index) => (
          <div key={ob.id} className="flex items-end gap-2 mt-2 animate-slide-up">
            <div className="flex-1">
              {index === 0 && <label className="label">{t('column')}</label>}
              <input
                type="text"
                value={ob.column}
                onChange={(e) => onUpdate(index, 'column', e.target.value)}
                placeholder={t('columnPlaceholder')}
              />
            </div>
            
            <div className="w-36">
              {index === 0 && <label className="label">{t('direction')}</label>}
              <select
                value={ob.direction}
                onChange={(e) => onUpdate(index, 'direction', e.target.value)}
              >
                <option value="ASC">{t('ascending')}</option>
                <option value="DESC">{t('descending')}</option>
              </select>
            </div>
            
            <button
              onClick={() => onRemove(index)}
              className="btn btn-ghost btn-sm text-slate-500 hover:text-red-400"
              title={t('removeOrderBy')}
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
