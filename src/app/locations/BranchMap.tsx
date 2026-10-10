'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = L.divIcon({
  className: 'locations-map-marker',
  html: '<div style="width:28px;height:28px;background:#237227;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export default function BranchMap({ branches }: { branches: { name: string; location: string; latitude: string; longitude: string }[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{
        width: '100%',
        height: '400px',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-services)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-tertiary)',
        fontSize: '0.9rem',
      }}>
        Loading map…
      </div>
    );
  }

  const validBranches = branches.filter(
    (b) => b.latitude !== 'LATITUDE_TBD' && b.longitude !== 'LONGITUDE_TBD'
  );

  if (validBranches.length === 0) return null;

  const center = {
    lat: parseFloat(validBranches[0].latitude),
    lng: parseFloat(validBranches[0].longitude),
  };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '400px', borderRadius: 'var(--radius-lg)', zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validBranches.map((branch, i) => (
        <Marker
          key={i}
          position={[parseFloat(branch.latitude), parseFloat(branch.longitude)]}
          icon={defaultIcon}
        >
          <Popup>
            <strong>{branch.name}</strong><br />
            {branch.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
