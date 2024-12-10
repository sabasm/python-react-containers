import { AppConfig, DEFAULT_CONFIG } from './config.types';

export class ConfigService {
  private static instance: ConfigService;
  private config: AppConfig;

  private constructor() {
    this.config = {
      environment: (process.env.NEXT_PUBLIC_APP_ENV as AppConfig['environment']) || DEFAULT_CONFIG.environment,
      api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || DEFAULT_CONFIG.api.baseUrl,
        clientBaseUrl: process.env.NEXT_PUBLIC_CLIENT_API_URL || DEFAULT_CONFIG.api.clientBaseUrl,
        timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || DEFAULT_CONFIG.api.timeout,
        retryCount: Number(process.env.NEXT_PUBLIC_API_RETRY_COUNT) || DEFAULT_CONFIG.api.retryCount,
        retryDelay: Number(process.env.NEXT_PUBLIC_API_RETRY_DELAY) || DEFAULT_CONFIG.api.retryDelay
      },
      monitoring: {
        enabled: process.env.NEXT_PUBLIC_MONITORING_ENABLED === 'true' || DEFAULT_CONFIG.monitoring.enabled,
        metricsPrefix: process.env.NEXT_PUBLIC_METRICS_PREFIX || DEFAULT_CONFIG.monitoring.metricsPrefix,
        flushInterval: Number(process.env.NEXT_PUBLIC_METRICS_FLUSH_INTERVAL) || DEFAULT_CONFIG.monitoring.flushInterval
      }
    };
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  public getConfig(): AppConfig {
    return this.config;
  }
}


