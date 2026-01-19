import { useState, useCallback } from 'react'
import { translateSQL } from '../services/api'

export function useTranslation() {
  const [sql, setSql] = useState('')
  const [sourceDialect, setSourceDialect] = useState('postgresql')
  const [targetDialect, setTargetDialect] = useState('mysql')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const translate = useCallback(async () => {
    if (!sql.trim()) {
      setError('sqlRequired')
      return
    }

    setLoading(true)
    setError('')
    setResult('')

    const response = await translateSQL(sql, sourceDialect, targetDialect)

    setLoading(false)

    if (response.success) {
      setResult(response.result)
    } else {
      setError(response.error)
    }
  }, [sql, sourceDialect, targetDialect])

  const clear = useCallback(() => {
    setSql('')
    setResult('')
    setError('')
  }, [])

  return {
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
  }
}
