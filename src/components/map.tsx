import React from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet'

interface MapProps {
  children: React.ReactNode;
  className?: string;
}

export default function Map({ children, className="" }: MapProps) {
  return (
    <MapContainer
      className={`${className}`}
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      { children }
    </MapContainer>
  );
}

interface MarkerProps {
  position: [lat: number, lng: number];
  children: React.ReactNode;
}

export const Marker = ({ position, children }: MarkerProps) => (
  <>{ children }</>
)