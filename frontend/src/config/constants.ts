import { ConfigService } from './config';

const config = ConfigService.getInstance().getConfig();

export const API_ENDPOINTS = {
  STATIONS: '/stations',
  STATION_DETAIL: (id: string) => `/stations/${id}`,
  HEALTH: '/health'
} as const;

export const POLLING_INTERVAL = 30000;

export const getApiUrl = (endpoint: string): string => {
  return `${config.api.baseUrl}${endpoint}`;
};


