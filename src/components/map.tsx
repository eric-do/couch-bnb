import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

interface MapProps {
  children: React.ReactNode;
  className?: string;
}

export default function Map({ children, className }: MapProps) {
  console.log('hi')

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      className={`${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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