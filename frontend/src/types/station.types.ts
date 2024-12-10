export interface Station {
  station_id: string;
  num_bikes_available: number;
  num_docks_available: number;
  is_installed: boolean;
  is_renting: boolean;
  is_returning: boolean;
  last_reported: number;
}

export interface StationsResponse {
  data: {
    stations: Station[];
  };
  last_updated: number;
  ttl: number;
}

export interface StationDetail extends Station {
  station_status: string;
  last_reported_formatted: string;
}
