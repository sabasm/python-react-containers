'use client';

import { Station, StationsResponse } from '@/types/station.types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS, POLLING_INTERVAL, getApiUrl } from '@/config/constants';
import styles from './stations.module.css';


export default function StationTable() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Fetching stations from:", getApiUrl(API_ENDPOINTS.STATIONS));

    const fetchStations = async () => {
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.STATIONS));
        if (!response.ok) throw new Error("Failed to fetch stations");
        const data: StationsResponse = await response.json();
        setStations(data.data.stations);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stations");
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
    const interval = setInterval(fetchStations, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleRowClick = (stationId: string) => {
    router.push(`/stations/${stationId}`);
  };

  if (loading) return <div>Loading stations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bike Stations</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Station ID</th>
            <th>Bikes Available</th>
            <th>Docks Available</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr
              key={station.station_id}
              onClick={() => handleRowClick(station.station_id)}
              className={styles.tableRow}
            >
              <td>{station.station_id}</td>
              <td>{station.num_bikes_available}</td>
              <td>{station.num_docks_available}</td>
              <td>{station.is_renting ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
