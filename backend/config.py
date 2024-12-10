from dataclasses import dataclass
from typing import Optional
import os
from functools import lru_cache

@dataclass
class ApiConfig:
    host: str
    port: int
    cors_origins: list[str]
    debug: bool

@dataclass
class MonitoringConfig:
    enabled: bool
    metrics_prefix: str
    flush_interval: int

@dataclass
class DatabaseConfig:
    url: str
    pool_size: int
    max_overflow: int

@dataclass
class Config:
    api: ApiConfig
    monitoring: MonitoringConfig
    database: DatabaseConfig
    environment: str
    secret_key: str

def get_env_bool(key: str, default: bool = False) -> bool:
    value = os.getenv(key)
    if value is None:
        return default
    return value.lower() in ('true', '1', 't', 'yes')

def get_env_int(key: str, default: int) -> int:
    value = os.getenv(key)
    if value is None:
        return default
    try:
        return int(value)
    except ValueError:
        return default

def get_env_list(key: str, default: list = None) -> list:
    value = os.getenv(key)
    if value is None:
        return default or []
    return [item.strip() for item in value.split(',')]

@lru_cache()
def get_config() -> Config:
    return Config(
        api=ApiConfig(
            host=os.getenv('API_HOST', '0.0.0.0'),
            port=get_env_int('API_PORT', 8000),
            cors_origins=get_env_list('CORS_ORIGINS', ['http://localhost:3000']),
            debug=get_env_bool('DEBUG', False)
        ),
        monitoring=MonitoringConfig(
            enabled=get_env_bool('MONITORING_ENABLED', False),
            metrics_prefix=os.getenv('METRICS_PREFIX', 'backend'),
            flush_interval=get_env_int('METRICS_FLUSH_INTERVAL', 10000)
        ),
        database=DatabaseConfig(
            url=os.getenv('DATABASE_URL', 'sqlite:///app.db'),
            pool_size=get_env_int('DB_POOL_SIZE', 5),
            max_overflow=get_env_int('DB_MAX_OVERFLOW', 10)
        ),
        environment=os.getenv('ENVIRONMENT', 'development'),
        secret_key=os.getenv('SECRET_KEY', 'dev-secret-key')
    )


