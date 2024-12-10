import StationTable from '@/components/stations/StationTable';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <h2>Bike Stations</h2>
      <StationTable />
    </div>
  );
}
