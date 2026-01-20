export const translations = {
  en: {
    // Header
    title: 'SQL-Translator',
    tagline: '100% algorithmic SQL translation — No AI',
    
    // Tabs
    generator: 'Generator',
    translator: 'Translator',
    
    // Common
    table: 'Table',
    tablePlaceholder: 'users',
    columns: 'Columns',
    columnsPlaceholder: 'id, name, email (comma separated, or * for all)',
    targetDialect: 'Target Dialect (optional)',
    sourceDialect: 'Source Dialect',
    generate: 'Generate',
    translate: 'Translate',
    copy: 'Copy',
    copied: 'Copied!',
    clear: 'Clear',
    result: 'Result',
    genericSql: 'Generic SQL',
    
    // Actions
    action: 'Action',
    select: 'Extract data',
    insert: 'Add data',
    update: 'Update data',
    delete: 'Delete data',
    
    // Conditions
    conditions: 'Conditions (WHERE)',
    addCondition: 'Add condition',
    addGroup: 'Add group',
    column: 'Column',
    columnPlaceholder: 'column_name',
    operator: 'Operator',
    value: 'Value',
    valuePlaceholder: 'value',
    removeCondition: 'Remove',
    
    // Joins
    joins: 'Joins',
    addJoin: 'Add join',
    joinType: 'Type',
    joinTable: 'Table',
    joinTablePlaceholder: 'orders',
    joinOn: 'ON condition',
    joinOnPlaceholder: 'users.id = orders.user_id',
    removeJoin: 'Remove',
    
    // Sorting & Limit
    orderBy: 'Order By',
    addOrderBy: 'Add sort',
    direction: 'Direction',
    ascending: 'Ascending',
    descending: 'Descending',
    removeOrderBy: 'Remove',
    limit: 'Limit',
    limitPlaceholder: '100',
    distinct: 'DISTINCT',
    groupBy: 'Group By',
    groupByPlaceholder: 'category, status (comma separated)',
    
    // INSERT specific
    values: 'Values',
    valuesPlaceholder: "value1, 'text value', NULL (comma separated)",
    
    // UPDATE specific
    setValues: 'SET Values',
    addSetValue: 'Add column',
    setColumn: 'Column',
    setValue: 'Value',
    
    // Translator
    sqlInput: 'SQL Query',
    sqlInputPlaceholder: 'Paste your SQL query here...',
    
    // Errors
    errorTitle: 'Error',
    tableRequired: 'Table name is required',
    sqlRequired: 'SQL query is required',
    
    // Limitations
    limitations: 'Limitations',
    limitationsText: 'This tool is a demonstration interface for SQLGlot. It does not support:',
    limitationsList: [
      'Procedural code (PL/SQL, T-SQL procedures)',
      'Triggers and stored functions',
      'Exotic proprietary functions',
      'Some complex CTEs and window functions may have limited support',
    ],
    
    // Footer
    footer: '© 2025 Jawed Tahir — jawed.fr',
    poweredBy: 'Powered by SQLGlot',
    
    // Mobile
    mobileWarning: 'This application is optimized for desktop. For the best experience, please use a larger screen.',
    
    // Logic operators
    and: 'AND',
    or: 'OR',
  },
  
  fr: {
    // Header
    title: 'SQL-Translator',
    tagline: 'Traduction SQL 100% algorithmique — Sans IA',
    
    // Tabs
    generator: 'Générateur',
    translator: 'Traducteur',
    
    // Common
    table: 'Table',
    tablePlaceholder: 'utilisateurs',
    columns: 'Colonnes',
    columnsPlaceholder: 'id, nom, email (séparées par virgule, ou * pour tout)',
    targetDialect: 'Dialecte cible (optionnel)',
    sourceDialect: 'Dialecte source',
    generate: 'Générer',
    translate: 'Traduire',
    copy: 'Copier',
    copied: 'Copié !',
    clear: 'Effacer',
    result: 'Résultat',
    genericSql: 'SQL générique',
    
    // Actions
    action: 'Action',
    select: 'Extraire des données',
    insert: 'Ajouter des données',
    update: 'Mettre à jour',
    delete: 'Supprimer des données',
    
    // Conditions
    conditions: 'Conditions (WHERE)',
    addCondition: 'Ajouter condition',
    addGroup: 'Ajouter groupe',
    column: 'Colonne',
    columnPlaceholder: 'nom_colonne',
    operator: 'Opérateur',
    value: 'Valeur',
    valuePlaceholder: 'valeur',
    removeCondition: 'Supprimer',
    
    // Joins
    joins: 'Jointures',
    addJoin: 'Ajouter jointure',
    joinType: 'Type',
    joinTable: 'Table',
    joinTablePlaceholder: 'commandes',
    joinOn: 'Condition ON',
    joinOnPlaceholder: 'utilisateurs.id = commandes.user_id',
    removeJoin: 'Supprimer',
    
    // Sorting & Limit
    orderBy: 'Tri',
    addOrderBy: 'Ajouter tri',
    direction: 'Direction',
    ascending: 'Croissant',
    descending: 'Décroissant',
    removeOrderBy: 'Supprimer',
    limit: 'Limite',
    limitPlaceholder: '100',
    distinct: 'DISTINCT',
    groupBy: 'Grouper par',
    groupByPlaceholder: 'categorie, statut (séparées par virgule)',
    
    // INSERT specific
    values: 'Valeurs',
    valuesPlaceholder: "valeur1, 'texte', NULL (séparées par virgule)",
    
    // UPDATE specific
    setValues: 'Valeurs SET',
    addSetValue: 'Ajouter colonne',
    setColumn: 'Colonne',
    setValue: 'Valeur',
    
    // Translator
    sqlInput: 'Requête SQL',
    sqlInputPlaceholder: 'Collez votre requête SQL ici...',
    
    // Errors
    errorTitle: 'Erreur',
    tableRequired: 'Le nom de la table est requis',
    sqlRequired: 'La requête SQL est requise',
    
    // Limitations
    limitations: 'Limitations',
    limitationsText: "Cet outil est une interface de démonstration pour SQLGlot. Il ne supporte pas :",
    limitationsList: [
      'Le code procédural (PL/SQL, procédures T-SQL)',
      'Les triggers et fonctions stockées',
      'Les fonctions propriétaires exotiques',
      'Certaines CTE complexes et fonctions de fenêtrage peuvent avoir un support limité',
    ],
    
    // Footer
    footer: '© 2025 Jawed Tahir — jawed.fr',
    poweredBy: 'Propulsé par SQLGlot',
    
    // Mobile
    mobileWarning: 'Cette application est optimisée pour ordinateur. Pour une meilleure expérience, utilisez un écran plus grand.',
    
    // Logic operators
    and: 'ET',
    or: 'OU',
  },
}

export const dialects = [
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'oracle', label: 'Oracle' },
  { value: 'sqlserver', label: 'SQL Server' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'bigquery', label: 'BigQuery' },
  { value: 'snowflake', label: 'Snowflake' },
  { value: 'redshift', label: 'Redshift' },
  { value: 'duckdb', label: 'DuckDB' },
  { value: 'spark', label: 'Spark SQL' },
  { value: 'hive', label: 'Hive' },
  { value: 'presto', label: 'Presto' },
  { value: 'trino', label: 'Trino' },
  { value: 'clickhouse', label: 'ClickHouse' },
  { value: 'databricks', label: 'Databricks' },
]

export const operators = [
  { value: '=', label: '= (equals)' },
  { value: '!=', label: '!= (not equals)' },
  { value: '<>', label: '<> (not equals)' },
  { value: '>', label: '> (greater than)' },
  { value: '>=', label: '>= (greater or equal)' },
  { value: '<', label: '< (less than)' },
  { value: '<=', label: '<= (less or equal)' },
  { value: 'LIKE', label: 'LIKE' },
  { value: 'NOT LIKE', label: 'NOT LIKE' },
  { value: 'ILIKE', label: 'ILIKE (case insensitive)' },
  { value: 'IN', label: 'IN' },
  { value: 'BETWEEN', label: 'BETWEEN' },
  { value: 'IS NULL', label: 'IS NULL' },
  { value: 'IS NOT NULL', label: 'IS NOT NULL' },
]

export const joinTypes = [
  { value: 'INNER', label: 'INNER JOIN' },
  { value: 'LEFT', label: 'LEFT JOIN' },
  { value: 'RIGHT', label: 'RIGHT JOIN' },
  { value: 'FULL', label: 'FULL JOIN' },
  { value: 'CROSS', label: 'CROSS JOIN' },
]
