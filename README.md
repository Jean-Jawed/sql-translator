# SQL-Translator

Translate and generate SQL queries across multiple database dialects. **100% algorithmic — No AI.**

Powered by [SQLGlot](https://github.com/tobymao/sqlglot).

## Features

### Generator
- Build SQL queries without knowing the syntax
- Supports SELECT, INSERT, UPDATE, DELETE operations
- Multi-table JOINs (INNER, LEFT, RIGHT, FULL, CROSS)
- Complex WHERE conditions with groups (AND/OR)
- ORDER BY, LIMIT, DISTINCT, GROUP BY

### Translator
- Translate existing SQL between dialects
- Supports 15+ SQL dialects

### Supported Dialects
MySQL, PostgreSQL, Oracle, SQL Server, SQLite, BigQuery, Snowflake, Redshift, DuckDB, Spark SQL, Hive, Presto, Trino, ClickHouse, Databricks

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| CSS | Tailwind CSS |
| Backend | Vercel Serverless Function (Python) |
| SQL Engine | SQLGlot |
| Hosting | Vercel |
| Analytics | Vercel Analytics |

## Project Structure

```
sql-translator/
├── api/
│   └── translate.py       # Serverless Python + SQLGlot
├── src/
│   ├── components/        # React components
│   ├── hooks/             # Custom hooks
│   ├── services/          # API calls
│   ├── i18n/              # Translations (EN/FR)
│   └── utils/             # Utilities
├── assets/
│   └── sql.jpg            # Decorative image
├── public/
│   └── favicon.ico        # Favicon
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── requirements.txt
└── tailwind.config.js
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Local Backend (optional)
For local development with the Python backend:

```bash
# Create a Python virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install Python dependencies
pip install -r requirements.txt
```

## Deployment

```bash
# Deploy to Vercel
vercel deploy

# Production deployment
vercel --prod
```

## Limitations

This tool is a demonstration interface for SQLGlot. It does not support:

- Procedural code (PL/SQL, T-SQL procedures)
- Triggers and stored functions
- Exotic proprietary functions
- Some complex CTEs and window functions may have limited support

## Internationalization

The application is bilingual (French/English) with manual toggle.

## License

© 2025 Jawed Tahir — [jawed.fr](https://jawed.fr)
