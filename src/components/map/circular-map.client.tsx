import { CircleMarker, LayersControl, MapContainer, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from "react";
import type { Counterpart } from "@/lib/demo-data";
import "leaflet/dist/leaflet.css";

const colors: Record<Counterpart["type"], string> = {
  "Ativos disponíveis": "#0f766e",
  "Consumidor de segunda vida": "#0284c7",
  Remanufaturador: "#ca8a04",
  Reciclador: "#dc2626",
  "Operador logístico": "#7c3aed",
  "Parceiro de diagnóstico": "#475569",
};

function RegionEvents({ onRegion }: { onRegion: (region: string) => void }) {
  useMapEvents({ click(e) { const { lat, lng } = e.latlng; if (lat > -14) onRegion(lng < -52 ? "Norte" : "Nordeste"); else if (lat > -21) onRegion(lng < -51 ? "Centro-Oeste" : "Sudeste"); else onRegion(lng < -50 ? "Sul" : "Sudeste"); } });
  return null;
}

export default function CircularMapClient({ points, selected, onSelect, onRegion }: { points: Counterpart[]; selected?: string; onSelect: (code: string) => void; onRegion: (region: string) => void }) {
  const [zoom, setZoom] = useState(4);
  return <MapContainer center={[-15.6, -51.8]} zoom={4} minZoom={3} maxZoom={9} scrollWheelZoom className="h-[640px] w-full" zoomControl aria-label="Mapa interativo do Brasil">
    <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <LayersControl position="topright"><LayersControl.Overlay checked name="Agentes e ativos"><>{points.map((p) => <CircleMarker key={p.code} center={[p.lat, p.lng]} radius={selected === p.code ? 13 : Math.max(7, Math.min(11, p.demands + 6))} pathOptions={{ color: colors[p.type], fillColor: colors[p.type], fillOpacity: .82, weight: selected === p.code ? 4 : 2 }} eventHandlers={{ click: () => { onSelect(p.code); onRegion(p.region); } }}>
      <Popup><div className="min-w-48"><strong>Empresa Verificada {p.code}</strong><br />{p.type}<br />Região: {p.region}<br />Químicas: {p.chemistries.join(", ")}<br />Demandas ativas: {p.demands}<br /><small>Dados demonstrativos</small></div></Popup>
    </CircleMarker>)}</></LayersControl.Overlay></LayersControl>
    <RegionEvents onRegion={onRegion} />
    <MapWatcher onZoom={setZoom} />
    <div className="leaflet-bottom leaflet-left"><div className="leaflet-control rounded bg-card px-2 py-1 text-xs shadow">Zoom {zoom} · arraste e clique no mapa</div></div>
  </MapContainer>;
}

function MapWatcher({ onZoom }: { onZoom: (zoom: number) => void }) { useMapEvents({ zoomend(e) { onZoom(e.target.getZoom()); } }); return null; }
