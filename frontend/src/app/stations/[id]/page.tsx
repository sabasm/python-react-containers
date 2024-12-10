'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import StationDetailView from './StationDetailView';

export default function StationDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <div>Invalid station ID</div>;
  }

  return (
    <Suspense fallback={<div>Loading station details...</div>}>
      <StationDetailView stationId={id as string} />
    </Suspense>
  );
}
