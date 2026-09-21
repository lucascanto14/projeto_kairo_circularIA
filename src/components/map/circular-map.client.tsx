import { Circle, CircleMarker, MapContainer, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
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

export type MapMode = "Pontos" | "Heatmap de Oferta" | "Heatmap de Demanda" | "Heatmap de Segunda Vida" | "Heatmap de Remanufatura" | "Heatmap de Reciclagem";

const focusByState: Record<string, { center: [number, number]; zoom: number }> = {
  Todos: { center: [-15.6, -51.8], zoom: 4 }, SP: { center: [-22.7, -48.6], zoom: 6 }, MG: { center: [-18.6, -44.3], zoom: 6 }, RJ: { center: [-22.2, -42.5], zoom: 7 }, PR: { center: [-24.7, -51.5], zoom: 6 }, RS: { center: [-29.8, -53.2], zoom: 6 }, GO: { center: [-16.0, -49.4], zoom: 6 }, PE: { center: [-8.4, -37.8], zoom: 6 }, AM: { center: [-4.4, -63.2], zoom: 5 },
};

const heatCenters: Record<Exclude<MapMode, "Pontos">, Array<{ center: [number, number]; intensity: number }>> = {
  "Heatmap de Oferta": [{ center: [-22.7, -47.3], intensity: 1 }, { center: [-25.2, -50.4], intensity: .62 }, { center: [-8.5, -37.5], intensity: .35 }],
  "Heatmap de Demanda": [{ center: [-23.1, -45.9], intensity: .9 }, { center: [-16.2, -49.2], intensity: .7 }, { center: [-29.4, -52.2], intensity: .55 }],
  "Heatmap de Segunda Vida": [{ center: [-22.8, -46.8], intensity: 1 }, { center: [-16.7, -49.2], intensity: .74 }, { center: [-8.1, -35.1], intensity: .42 }],
  "Heatmap de Remanufatura": [{ center: [-23.0, -46.4], intensity: 1 }, { center: [-25.4, -49.2], intensity: .7 }, { center: [-30.0, -51.2], intensity: .48 }],
  "Heatmap de Reciclagem": [{ center: [-19.9, -44.0], intensity: 1 }, { center: [-23.5, -46.6], intensity: .76 }, { center: [-8.0, -34.9], intensity: .5 }],
};

function RegionEvents({ onRegion, onState }: { onRegion: (region: string) => void; onState: (state: string) => void }) {
  useMapEvents({ click(e) { const { lat, lng } = e.latlng; if (lat > -14) onRegion(lng < -52 ? "Norte" : "Nordeste"); else if (lat > -21) onRegion(lng < -51 ? "Centro-Oeste" : "Sudeste"); else onRegion(lng < -50 ? "Sul" : "Sudeste"); const nearest = Object.entries(focusByState).filter(([key]) => key !== "Todos").sort(([, a], [, b]) => Math.hypot(lat - a.center[0], lng - a.center[1]) - Math.hypot(lat - b.center[0], lng - b.center[1]))[0]; if (nearest) onState(nearest[0]); } });
  return null;
}

function MapFocus({ state, region }: { state: string; region: string }) {
  const map = useMap();
  useEffect(() => { const stateFocus = focusByState[state]; if (stateFocus) { map.flyTo(stateFocus.center, stateFocus.zoom, { duration: .8 }); return; } const regionFocus: Record<string, [number, number]> = { Norte: [-4, -61], Nordeste: [-9, -40], "Centro-Oeste": [-15.5, -54], Sudeste: [-21.5, -45], Sul: [-27.5, -51] }; const center = regionFocus[region]; if (center) map.flyTo(center, 5, { duration: .8 }); else map.flyTo([-15.6, -51.8], 4, { duration: .8 }); }, [map, region, state]);
  return null;
}

export default function CircularMapClient({ points, selected, onSelect, onRegion, onState, mode, state, region }: { points: Counterpart[]; selected?: string; onSelect: (code: string) => void; onRegion: (region: string) => void; onState: (state: string) => void; mode: MapMode; state: string; region: string }) {
  const [zoom, setZoom] = useState(4);
  return <MapContainer center={[-15.6, -51.8]} zoom={4} minZoom={3} maxZoom={9} scrollWheelZoom className="h-[640px] w-full" zoomControl aria-label="Mapa interativo do Brasil">
    <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {mode === "Pontos" ? points.map((p) => <CircleMarker key={p.code} center={[p.lat, p.lng]} radius={selected === p.code ? 13 : Math.max(7, Math.min(11, p.demands + 6))} pathOptions={{ color: colors[p.type], fillColor: colors[p.type], fillOpacity: .82, weight: selected === p.code ? 4 : 2 }} eventHandlers={{ click: () => { onSelect(p.code); onRegion(p.region); onState(p.state); } }}>
      <Popup><div className="min-w-48"><strong>Empresa Verificada {p.code}</strong><br />{p.type}<br />Região: {p.region}<br />Químicas: {p.chemistries.join(", ")}<br />Demandas ativas: {p.demands}<br /><small>Dados demonstrativos</small></div></Popup>
    </CircleMarker>) : heatCenters[mode].map((area, index) => <Circle key={`${mode}-${index}`} center={area.center} radius={140000 + area.intensity * 260000} pathOptions={{ color: colors[mode === "Heatmap de Oferta" ? "Ativos disponíveis" : mode === "Heatmap de Segunda Vida" ? "Consumidor de segunda vida" : mode === "Heatmap de Remanufatura" ? "Remanufaturador" : mode === "Heatmap de Reciclagem" ? "Reciclador" : "Parceiro de diagnóstico"], fillOpacity: .18 + area.intensity * .28, weight: 1 }} />)}
    <RegionEvents onRegion={onRegion} onState={onState} />
    <MapFocus state={state} region={region} />
    <MapWatcher onZoom={setZoom} />
    <div className="leaflet-bottom leaflet-left"><div className="leaflet-control rounded bg-card px-2 py-1 text-xs shadow">{mode} · zoom {zoom}</div></div>
  </MapContainer>;
}

function MapWatcher({ onZoom }: { onZoom: (zoom: number) => void }) { useMapEvents({ zoomend(e) { onZoom(e.target.getZoom()); } }); return null; }
