import { useLanguage } from '../../i18n/LanguageContext'
import { operators } from '../../i18n/translations'

export function ConditionBuilder({ conditions, onAddCondition, onAddGroup, onUpdate, onRemove }) {
  const { t } = useLanguage()

  const needsValue = (operator) => {
    return !['IS NULL', 'IS NOT NULL'].includes(operator.toUpperCase())
  }

  const renderCondition = (condition, index, parentIndex = null) => {
    if (condition.isGroup) {
      return (
        <div key={condition.id} className="condition-group mt-3 animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            {index > 0 && (
              <select
                value={condition.logic}
                onChange={(e) => onUpdate(index, 'logic', e.target.value, parentIndex)}
                className="w-20 text-xs"
              >
                <option value="AND">{t('and')}</option>
                <option value="OR">{t('or')}</option>
              </select>
            )}
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Group</span>
            <button
              onClick={() => onRemove(index, parentIndex)}
              className="btn btn-ghost btn-sm text-slate-500 hover:text-red-400 ml-auto"
              title={t('removeCondition')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Nested conditions */}
          {(condition.conditions || []).map((nestedCond, nestedIdx) => 
            renderCondition(nestedCond, nestedIdx, index)
          )}
          
          <button
            onClick={() => onAddCondition(index)}
            className="btn btn-ghost btn-sm text-blue-400 mt-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {t('addCondition')}
          </button>
        </div>
      )
    }

    return (
      <div key={condition.id} className="flex flex-wrap items-end gap-2 mt-2 animate-slide-up">
        {index > 0 && (
          <div className="w-20">
            <select
              value={condition.logic}
              onChange={(e) => onUpdate(index, 'logic', e.target.value, parentIndex)}
              className="text-xs"
            >
              <option value="AND">{t('and')}</option>
              <option value="OR">{t('or')}</option>
            </select>
          </div>
        )}
        
        <div className="flex-1 min-w-[120px]">
          {index === 0 && <label className="label">{t('column')}</label>}
          <input
            type="text"
            value={condition.column}
            onChange={(e) => onUpdate(index, 'column', e.target.value, parentIndex)}
            placeholder={t('columnPlaceholder')}
          />
        </div>
        
        <div className="w-40">
          {index === 0 && <label className="label">{t('operator')}</label>}
          <select
            value={condition.operator}
            onChange={(e) => onUpdate(index, 'operator', e.target.value, parentIndex)}
          >
            {operators.map(op => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
        </div>
        
        {needsValue(condition.operator) && (
          <div className="flex-1 min-w-[120px]">
            {index === 0 && <label className="label">{t('value')}</label>}
            <input
              type="text"
              value={condition.value}
              onChange={(e) => onUpdate(index, 'value', e.target.value, parentIndex)}
              placeholder={t('valuePlaceholder')}
            />
          </div>
        )}
        
        <button
          onClick={() => onRemove(index, parentIndex)}
          className="btn btn-ghost btn-sm text-slate-500 hover:text-red-400"
          title={t('removeCondition')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-400">{t('conditions')}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onAddCondition()}
            className="btn btn-ghost btn-sm text-blue-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {t('addCondition')}
          </button>
          <button
            onClick={onAddGroup}
            className="btn btn-ghost btn-sm text-purple-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {t('addGroup')}
          </button>
        </div>
      </div>
      
      {conditions.length === 0 ? (
        <p className="text-sm text-slate-600 italic">No conditions</p>
      ) : (
        conditions.map((cond, idx) => renderCondition(cond, idx))
      )}
    </div>
  )
}
