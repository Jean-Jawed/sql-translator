import { useLanguage } from '../../i18n/LanguageContext'
import { useQueryBuilder } from '../../hooks/useQueryBuilder'
import { DialectSelect } from '../UI/DialectSelect'
import { ResultDisplay } from '../UI/ResultDisplay'
import { LoadingSpinner } from '../UI/LoadingSpinner'
import { ConditionBuilder } from './ConditionBuilder'
import { JoinBuilder } from './JoinBuilder'
import { OrderByBuilder } from './OrderByBuilder'
import { SetValuesBuilder } from './SetValuesBuilder'

export function Generator() {
  const { t } = useLanguage()
  const {
    config,
    updateConfig,
    resetConfig,
    targetDialect,
    setTargetDialect,
    result,
    error,
    loading,
    generate,
    addCondition,
    addConditionGroup,
    updateCondition,
    removeCondition,
    addJoin,
    updateJoin,
    removeJoin,
    addOrderBy,
    updateOrderBy,
    removeOrderBy,
    addSetValue,
    updateSetValue,
    removeSetValue,
  } = useQueryBuilder()

  const actions = ['SELECT', 'INSERT', 'UPDATE', 'DELETE']

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Action & Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="action" className="label">{t('action')}</label>
          <select
            id="action"
            value={config.action}
            onChange={(e) => updateConfig('action', e.target.value)}
          >
            {actions.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="table" className="label">{t('table')} *</label>
          <input
            id="table"
            type="text"
            value={config.table}
            onChange={(e) => updateConfig('table', e.target.value)}
            placeholder={t('tablePlaceholder')}
          />
        </div>
        
        <DialectSelect
          label={t('targetDialect')}
          value={targetDialect}
          onChange={setTargetDialect}
          id="targetDialect"
        />
      </div>

      {/* SELECT specific options */}
      {config.action === 'SELECT' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="columns" className="label">{t('columns')}</label>
              <input
                id="columns"
                type="text"
                value={config.columns}
                onChange={(e) => updateConfig('columns', e.target.value)}
                placeholder={t('columnsPlaceholder')}
              />
            </div>
            
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label htmlFor="limit" className="label">{t('limit')}</label>
                <input
                  id="limit"
                  type="number"
                  min="0"
                  value={config.limit}
                  onChange={(e) => updateConfig('limit', e.target.value)}
                  placeholder={t('limitPlaceholder')}
                />
              </div>
              
              <label className="flex items-center gap-2 pb-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.distinct}
                  onChange={(e) => updateConfig('distinct', e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                />
                <span className="text-sm text-slate-300">{t('distinct')}</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="groupBy" className="label">{t('groupBy')}</label>
            <input
              id="groupBy"
              type="text"
              value={config.groupBy}
              onChange={(e) => updateConfig('groupBy', e.target.value)}
              placeholder={t('groupByPlaceholder')}
            />
          </div>

          {/* Joins */}
          <JoinBuilder
            joins={config.joins}
            onAdd={addJoin}
            onUpdate={updateJoin}
            onRemove={removeJoin}
          />

          {/* Order By */}
          <OrderByBuilder
            orderBy={config.orderBy}
            onAdd={addOrderBy}
            onUpdate={updateOrderBy}
            onRemove={removeOrderBy}
          />
        </>
      )}

      {/* INSERT specific options */}
      {config.action === 'INSERT' && (
        <>
          <div>
            <label htmlFor="columns" className="label">{t('columns')}</label>
            <input
              id="columns"
              type="text"
              value={config.columns}
              onChange={(e) => updateConfig('columns', e.target.value)}
              placeholder={t('columnsPlaceholder')}
            />
          </div>
          
          <div>
            <label htmlFor="values" className="label">{t('values')}</label>
            <input
              id="values"
              type="text"
              value={config.values}
              onChange={(e) => updateConfig('values', e.target.value)}
              placeholder={t('valuesPlaceholder')}
            />
          </div>
        </>
      )}

      {/* UPDATE specific options */}
      {config.action === 'UPDATE' && (
        <SetValuesBuilder
          setValues={config.setValues}
          onAdd={addSetValue}
          onUpdate={updateSetValue}
          onRemove={removeSetValue}
        />
      )}

      {/* Conditions (WHERE) - for SELECT, UPDATE, DELETE */}
      {config.action !== 'INSERT' && (
        <ConditionBuilder
          conditions={config.conditions}
          onAddCondition={addCondition}
          onAddGroup={addConditionGroup}
          onUpdate={updateCondition}
          onRemove={removeCondition}
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={generate}
          disabled={loading || !config.table.trim()}
          className="btn btn-primary"
        >
          {loading && <LoadingSpinner />}
          {t('generate')}
        </button>
        
        <button
          onClick={resetConfig}
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
