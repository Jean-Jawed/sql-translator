from http.server import BaseHTTPRequestHandler
import json
import sqlglot
from sqlglot import exp
from sqlglot.errors import ParseError, UnsupportedError, OptimizeError

DIALECT_MAP = {
    'mysql': 'mysql',
    'postgresql': 'postgres',
    'oracle': 'oracle',
    'sqlserver': 'tsql',
    'sqlite': 'sqlite',
    'bigquery': 'bigquery',
    'snowflake': 'snowflake',
    'redshift': 'redshift',
    'duckdb': 'duckdb',
    'spark': 'spark',
    'hive': 'hive',
    'presto': 'presto',
    'trino': 'trino',
    'clickhouse': 'clickhouse',
    'databricks': 'databricks',
}

def translate_sql(sql: str, source_dialect: str, target_dialect: str) -> dict:
    """Translate SQL from one dialect to another using SQLGlot."""
    try:
        source = DIALECT_MAP.get(source_dialect, source_dialect)
        target = DIALECT_MAP.get(target_dialect, target_dialect)
        
        result = sqlglot.transpile(
            sql,
            read=source,
            write=target,
            pretty=True
        )
        
        return {
            'success': True,
            'result': result[0] if result else '',
            'statements': result
        }
    except ParseError as e:
        return {
            'success': False,
            'error': f"Parse error: {str(e)}",
            'error_type': 'parse'
        }
    except UnsupportedError as e:
        return {
            'success': False,
            'error': f"Unsupported operation: {str(e)}",
            'error_type': 'unsupported'
        }
    except OptimizeError as e:
        return {
            'success': False,
            'error': f"Optimization error: {str(e)}",
            'error_type': 'optimize'
        }
    except Exception as e:
        return {
            'success': False,
            'error': f"Translation error: {str(e)}",
            'error_type': 'unknown'
        }

def generate_sql(config: dict, target_dialect: str) -> dict:
    """Generate SQL from a configuration object."""
    try:
        action = config.get('action', 'SELECT')
        table = config.get('table', '')
        
        if not table:
            return {
                'success': False,
                'error': 'Table name is required',
                'error_type': 'validation'
            }
        
        if action == 'SELECT':
            sql = build_select(config)
        elif action == 'INSERT':
            sql = build_insert(config)
        elif action == 'UPDATE':
            sql = build_update(config)
        elif action == 'DELETE':
            sql = build_delete(config)
        else:
            return {
                'success': False,
                'error': f'Unsupported action: {action}',
                'error_type': 'validation'
            }
        
        # If no target dialect specified, return generic SQL (just format it)
        if not target_dialect:
            result = sqlglot.transpile(sql, pretty=True)
        else:
            target = DIALECT_MAP.get(target_dialect, target_dialect)
            result = sqlglot.transpile(sql, read='postgres', write=target, pretty=True)
        
        return {
            'success': True,
            'result': result[0] if result else ''
        }
    except Exception as e:
        return {
            'success': False,
            'error': f"Generation error: {str(e)}",
            'error_type': 'generation'
        }

def build_select(config: dict) -> str:
    """Build a SELECT statement."""
    table = config.get('table', '')
    columns = config.get('columns', ['*'])
    conditions = config.get('conditions', [])
    joins = config.get('joins', [])
    order_by = config.get('orderBy', [])
    limit = config.get('limit')
    distinct = config.get('distinct', False)
    group_by = config.get('groupBy', [])
    
    # Build column list
    if not columns or columns == ['']:
        columns = ['*']
    col_str = ', '.join(columns)
    
    # DISTINCT
    distinct_str = 'DISTINCT ' if distinct else ''
    
    sql = f"SELECT {distinct_str}{col_str} FROM {table}"
    
    # JOINs
    for join in joins:
        join_type = join.get('type', 'INNER')
        join_table = join.get('table', '')
        join_on = join.get('on', '')
        if join_table and join_on:
            sql += f" {join_type} JOIN {join_table} ON {join_on}"
    
    # WHERE
    where_clause = build_where(conditions)
    if where_clause:
        sql += f" WHERE {where_clause}"
    
    # GROUP BY
    if group_by and group_by != ['']:
        sql += f" GROUP BY {', '.join(group_by)}"
    
    # ORDER BY
    if order_by:
        order_parts = []
        for ob in order_by:
            col = ob.get('column', '')
            direction = ob.get('direction', 'ASC')
            if col:
                order_parts.append(f"{col} {direction}")
        if order_parts:
            sql += f" ORDER BY {', '.join(order_parts)}"
    
    # LIMIT
    if limit and str(limit).isdigit():
        sql += f" LIMIT {limit}"
    
    return sql

def build_insert(config: dict) -> str:
    """Build an INSERT statement."""
    table = config.get('table', '')
    columns = config.get('columns', [])
    values = config.get('values', [])
    
    if columns and columns != ['']:
        col_str = f"({', '.join(columns)})"
    else:
        col_str = ''
    
    # Format values
    formatted_values = []
    for v in values:
        if v is None or v == '':
            formatted_values.append('NULL')
        elif isinstance(v, (int, float)):
            formatted_values.append(str(v))
        elif str(v).upper() in ('NULL', 'TRUE', 'FALSE', 'DEFAULT'):
            formatted_values.append(str(v).upper())
        elif str(v).startswith("'") and str(v).endswith("'"):
            formatted_values.append(v)
        else:
            # Escape single quotes
            escaped = str(v).replace("'", "''")
            formatted_values.append(f"'{escaped}'")
    
    val_str = f"({', '.join(formatted_values)})"
    
    return f"INSERT INTO {table} {col_str} VALUES {val_str}".strip()

def build_update(config: dict) -> str:
    """Build an UPDATE statement."""
    table = config.get('table', '')
    set_values = config.get('setValues', [])
    conditions = config.get('conditions', [])
    
    set_parts = []
    for sv in set_values:
        col = sv.get('column', '')
        val = sv.get('value', '')
        if col:
            if val is None or val == '':
                set_parts.append(f"{col} = NULL")
            elif isinstance(val, (int, float)):
                set_parts.append(f"{col} = {val}")
            elif str(val).upper() in ('NULL', 'TRUE', 'FALSE', 'DEFAULT'):
                set_parts.append(f"{col} = {str(val).upper()}")
            elif str(val).startswith("'") and str(val).endswith("'"):
                set_parts.append(f"{col} = {val}")
            else:
                escaped = str(val).replace("'", "''")
                set_parts.append(f"{col} = '{escaped}'")
    
    sql = f"UPDATE {table} SET {', '.join(set_parts)}"
    
    where_clause = build_where(conditions)
    if where_clause:
        sql += f" WHERE {where_clause}"
    
    return sql

def build_delete(config: dict) -> str:
    """Build a DELETE statement."""
    table = config.get('table', '')
    conditions = config.get('conditions', [])
    
    sql = f"DELETE FROM {table}"
    
    where_clause = build_where(conditions)
    if where_clause:
        sql += f" WHERE {where_clause}"
    
    return sql

def build_where(conditions: list) -> str:
    """Build WHERE clause from conditions with group support."""
    if not conditions:
        return ''
    
    return build_condition_group(conditions)

def build_condition_group(conditions: list, is_root: bool = True) -> str:
    """Recursively build condition groups."""
    parts = []
    
    for i, cond in enumerate(conditions):
        if cond.get('isGroup'):
            # It's a group of conditions
            group_conditions = cond.get('conditions', [])
            if group_conditions:
                group_str = build_condition_group(group_conditions, False)
                if group_str:
                    parts.append(f"({group_str})")
        else:
            # It's a simple condition
            col = cond.get('column', '')
            op = cond.get('operator', '=')
            val = cond.get('value', '')
            
            if col:
                condition_str = build_single_condition(col, op, val)
                if condition_str:
                    parts.append(condition_str)
    
    # Join with logical operators
    if not parts:
        return ''
    
    result_parts = []
    for i, part in enumerate(parts):
        if i == 0:
            result_parts.append(part)
        else:
            # Get logical operator from condition
            cond = conditions[i]
            logic = cond.get('logic', 'AND')
            result_parts.append(f" {logic} {part}")
    
    return ''.join(result_parts)

def build_single_condition(column: str, operator: str, value) -> str:
    """Build a single condition string."""
    op_upper = operator.upper()
    
    if op_upper in ('IS NULL', 'IS NOT NULL'):
        return f"{column} {op_upper}"
    
    if op_upper == 'IN':
        # Value should be a comma-separated list
        if isinstance(value, list):
            vals = value
        else:
            vals = [v.strip() for v in str(value).split(',')]
        formatted = []
        for v in vals:
            if v.startswith("'") and v.endswith("'"):
                formatted.append(v)
            else:
                escaped = str(v).replace("'", "''")
                formatted.append(f"'{escaped}'")
        return f"{column} IN ({', '.join(formatted)})"
    
    if op_upper == 'BETWEEN':
        # Value should be "val1 AND val2"
        return f"{column} BETWEEN {value}"
    
    if op_upper in ('LIKE', 'ILIKE', 'NOT LIKE'):
        if value.startswith("'") and value.endswith("'"):
            return f"{column} {op_upper} {value}"
        escaped = str(value).replace("'", "''")
        return f"{column} {op_upper} '{escaped}'"
    
    # Standard comparison operators
    if isinstance(value, (int, float)):
        return f"{column} {operator} {value}"
    elif str(value).upper() in ('NULL', 'TRUE', 'FALSE'):
        return f"{column} {operator} {str(value).upper()}"
    elif value.startswith("'") and value.endswith("'"):
        return f"{column} {operator} {value}"
    else:
        escaped = str(value).replace("'", "''")
        return f"{column} {operator} '{escaped}'"

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        
        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            self.send_error_response({'error': 'Invalid JSON', 'success': False})
            return
        
        action = data.get('action')
        
        if action == 'translate':
            sql = data.get('sql', '')
            source = data.get('sourceDialect', 'postgresql')
            target = data.get('targetDialect', 'mysql')
            result = translate_sql(sql, source, target)
        elif action == 'generate':
            config = data.get('config', {})
            target = data.get('targetDialect', 'postgresql')
            result = generate_sql(config, target)
        else:
            result = {
                'success': False,
                'error': f'Unknown action: {action}',
                'error_type': 'validation'
            }
        
        self.send_json_response(result)
    
    def send_json_response(self, data: dict):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def send_error_response(self, data: dict):
        self.send_response(400)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
