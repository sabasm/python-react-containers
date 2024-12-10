'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StationDetail } from '@/types/station.types';
import { API_ENDPOINTS, getApiUrl } from '@/config/constants';
import styles from '@/components/stations/stations.module.css';

interface StationDetailViewProps {
  stationId: string;
}

export default function StationDetailView({ stationId }: StationDetailViewProps) {
  const [station, setStation] = useState<StationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStationDetail = async () => {
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.STATION_DETAIL(stationId)));
        if (!response.ok) throw new Error('Failed to fetch station details');
        const data = await response.json();
        setStation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load station details');
      } finally {
        setLoading(false);
      }
    };

    fetchStationDetail();
  }, [stationId]);

  if (loading) return <div>Loading station details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!station) return <div>Station not found</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.button}>
        Back to Stations
      </button>
      <div className={styles.card}>
        <h1>Station Details</h1>
        <div className={styles.details}>
          <p><strong>Station ID:</strong> {station.station_id}</p>
          <p><strong>Bikes Available:</strong> {station.num_bikes_available}</p>
          <p><strong>Docks Available:</strong> {station.num_docks_available}</p>
          <p><strong>Status:</strong> {station.is_renting ? 'Active' : 'Inactive'}</p>
          <p><strong>Installed:</strong> {station.is_installed ? 'Yes' : 'No'}</p>
          <p><strong>Accepting Returns:</strong> {station.is_returning ? 'Yes' : 'No'}</p>
          <p><strong>Last Updated:</strong> {new Date(station.last_reported * 1000).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
