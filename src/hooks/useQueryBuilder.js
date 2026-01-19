import { useState, useCallback } from 'react'
import { generateSQL } from '../services/api'

const initialState = {
  action: 'SELECT',
  table: '',
  columns: '',
  conditions: [],
  joins: [],
  orderBy: [],
  limit: '',
  distinct: false,
  groupBy: '',
  values: '',
  setValues: [],
}

export function useQueryBuilder() {
  const [config, setConfig] = useState(initialState)
  const [targetDialect, setTargetDialect] = useState('postgresql')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const updateConfig = useCallback((key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetConfig = useCallback(() => {
    setConfig(initialState)
    setResult('')
    setError('')
  }, [])

  // Conditions management
  const addCondition = useCallback((parentIndex = null) => {
    setConfig(prev => {
      const newCondition = {
        id: Date.now(),
        column: '',
        operator: '=',
        value: '',
        logic: 'AND',
        isGroup: false,
      }
      
      if (parentIndex === null) {
        return { ...prev, conditions: [...prev.conditions, newCondition] }
      }
      
      // Add to nested group
      const updateNestedConditions = (conditions, targetIndex) => {
        return conditions.map((cond, idx) => {
          if (idx === targetIndex && cond.isGroup) {
            return {
              ...cond,
              conditions: [...(cond.conditions || []), newCondition]
            }
          }
          return cond
        })
      }
      
      return { ...prev, conditions: updateNestedConditions(prev.conditions, parentIndex) }
    })
  }, [])

  const addConditionGroup = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        {
          id: Date.now(),
          isGroup: true,
          logic: 'AND',
          conditions: [],
        }
      ]
    }))
  }, [])

  const updateCondition = useCallback((index, field, value, parentIndex = null) => {
    setConfig(prev => {
      if (parentIndex === null) {
        const newConditions = [...prev.conditions]
        newConditions[index] = { ...newConditions[index], [field]: value }
        return { ...prev, conditions: newConditions }
      }
      
      // Update nested condition
      const newConditions = prev.conditions.map((cond, idx) => {
        if (idx === parentIndex && cond.isGroup) {
          const nestedConditions = [...(cond.conditions || [])]
          nestedConditions[index] = { ...nestedConditions[index], [field]: value }
          return { ...cond, conditions: nestedConditions }
        }
        return cond
      })
      
      return { ...prev, conditions: newConditions }
    })
  }, [])

  const removeCondition = useCallback((index, parentIndex = null) => {
    setConfig(prev => {
      if (parentIndex === null) {
        return {
          ...prev,
          conditions: prev.conditions.filter((_, i) => i !== index)
        }
      }
      
      // Remove from nested group
      const newConditions = prev.conditions.map((cond, idx) => {
        if (idx === parentIndex && cond.isGroup) {
          return {
            ...cond,
            conditions: (cond.conditions || []).filter((_, i) => i !== index)
          }
        }
        return cond
      })
      
      return { ...prev, conditions: newConditions }
    })
  }, [])

  // Joins management
  const addJoin = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      joins: [
        ...prev.joins,
        {
          id: Date.now(),
          type: 'INNER',
          table: '',
          on: '',
        }
      ]
    }))
  }, [])

  const updateJoin = useCallback((index, field, value) => {
    setConfig(prev => {
      const newJoins = [...prev.joins]
      newJoins[index] = { ...newJoins[index], [field]: value }
      return { ...prev, joins: newJoins }
    })
  }, [])

  const removeJoin = useCallback((index) => {
    setConfig(prev => ({
      ...prev,
      joins: prev.joins.filter((_, i) => i !== index)
    }))
  }, [])

  // Order By management
  const addOrderBy = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      orderBy: [
        ...prev.orderBy,
        {
          id: Date.now(),
          column: '',
          direction: 'ASC',
        }
      ]
    }))
  }, [])

  const updateOrderBy = useCallback((index, field, value) => {
    setConfig(prev => {
      const newOrderBy = [...prev.orderBy]
      newOrderBy[index] = { ...newOrderBy[index], [field]: value }
      return { ...prev, orderBy: newOrderBy }
    })
  }, [])

  const removeOrderBy = useCallback((index) => {
    setConfig(prev => ({
      ...prev,
      orderBy: prev.orderBy.filter((_, i) => i !== index)
    }))
  }, [])

  // SET values management (for UPDATE)
  const addSetValue = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      setValues: [
        ...prev.setValues,
        {
          id: Date.now(),
          column: '',
          value: '',
        }
      ]
    }))
  }, [])

  const updateSetValue = useCallback((index, field, value) => {
    setConfig(prev => {
      const newSetValues = [...prev.setValues]
      newSetValues[index] = { ...newSetValues[index], [field]: value }
      return { ...prev, setValues: newSetValues }
    })
  }, [])

  const removeSetValue = useCallback((index) => {
    setConfig(prev => ({
      ...prev,
      setValues: prev.setValues.filter((_, i) => i !== index)
    }))
  }, [])

  // Generate SQL
  const generate = useCallback(async () => {
    if (!config.table.trim()) {
      setError('tableRequired')
      return
    }

    setLoading(true)
    setError('')
    setResult('')

    // Build config object for API
    const apiConfig = {
      action: config.action,
      table: config.table.trim(),
      columns: config.columns.split(',').map(c => c.trim()).filter(Boolean),
      conditions: config.conditions.map(cond => {
        if (cond.isGroup) {
          return {
            isGroup: true,
            logic: cond.logic,
            conditions: (cond.conditions || []).map(c => ({
              column: c.column,
              operator: c.operator,
              value: c.value,
              logic: c.logic,
            }))
          }
        }
        return {
          column: cond.column,
          operator: cond.operator,
          value: cond.value,
          logic: cond.logic,
        }
      }),
      joins: config.joins.map(j => ({
        type: j.type,
        table: j.table,
        on: j.on,
      })),
      orderBy: config.orderBy.map(o => ({
        column: o.column,
        direction: o.direction,
      })),
      limit: config.limit,
      distinct: config.distinct,
      groupBy: config.groupBy.split(',').map(c => c.trim()).filter(Boolean),
      values: config.values.split(',').map(v => v.trim()),
      setValues: config.setValues.map(sv => ({
        column: sv.column,
        value: sv.value,
      })),
    }

    const response = await generateSQL(apiConfig, targetDialect)

    setLoading(false)

    if (response.success) {
      setResult(response.result)
    } else {
      setError(response.error)
    }
  }, [config, targetDialect])

  return {
    config,
    updateConfig,
    resetConfig,
    targetDialect,
    setTargetDialect,
    result,
    error,
    loading,
    generate,
    // Conditions
    addCondition,
    addConditionGroup,
    updateCondition,
    removeCondition,
    // Joins
    addJoin,
    updateJoin,
    removeJoin,
    // Order By
    addOrderBy,
    updateOrderBy,
    removeOrderBy,
    // Set Values
    addSetValue,
    updateSetValue,
    removeSetValue,
  }
}
