const API_URL = '/api/translate'

export async function translateSQL(sql, sourceDialect, targetDialect) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'translate',
        sql,
        sourceDialect,
        targetDialect,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Network error',
      error_type: 'network',
    }
  }
}

export async function generateSQL(config, targetDialect) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'generate',
        config,
        targetDialect,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Network error',
      error_type: 'network',
    }
  }
}
