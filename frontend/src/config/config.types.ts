export type Environment = 'development' | 'staging' | 'production';

export interface ApiConfig {
  baseUrl: string;
  clientBaseUrl?: string;
  timeout: number;
  retryCount: number;
  retryDelay: number;
}

export interface MonitoringConfig {
  enabled: boolean;
  metricsPrefix: string;
  flushInterval: number;
}

export interface AppConfig {
  environment: Environment;
  api: ApiConfig;
  monitoring: MonitoringConfig;
}

export const DEFAULT_CONFIG: AppConfig = {
  environment: process.env.NEXT_PUBLIC_APP_ENV as Environment || 'development',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    clientBaseUrl: process.env.NEXT_PUBLIC_CLIENT_API_URL || 'http://localhost:8000',
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 5000,
    retryCount: Number(process.env.NEXT_PUBLIC_API_RETRY_COUNT) || 3,
    retryDelay: Number(process.env.NEXT_PUBLIC_API_RETRY_DELAY) || 1000
  },
  monitoring: {
    enabled: process.env.NEXT_PUBLIC_MONITORING_ENABLED === 'true',
    metricsPrefix: process.env.NEXT_PUBLIC_METRICS_PREFIX || 'frontend',
    flushInterval: Number(process.env.NEXT_PUBLIC_METRICS_FLUSH_INTERVAL) || 10000
  }
};


