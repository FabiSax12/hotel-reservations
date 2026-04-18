"use client";

import { useState } from "react";
import { ModernSearchBar } from "@hotel/ui";

const mockRooms = [
  // Monteverde
  {
    id: "mv-1",
    location: "Monteverde",
    title: "Cabaña Estándar del Bosque",
    type: "Standard",
    price: 145,
    inventory: 8,
    sqft: 45,
    description: "Una inmersión acogedora en el bosque nuboso con ventanales de piso a techo y terraza de madera privada.",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "mv-2",
    location: "Monteverde",
    title: "Suite Dosel Panorámica",
    type: "Suite",
    price: 280,
    inventory: 3,
    sqft: 80,
    description: "Nuestra suite elevada al nivel del dosel arbóreo. Avistamiento de aves desde tu tina de hidromasaje exterior.",
    image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: "mv-3",
    location: "Monteverde",
    title: "Eco-Lodge Familiar",
    type: "Family",
    price: 320,
    inventory: 2,
    sqft: 120,
    description: "Diseñada para familias, con habitaciones conectadas, cocina completa y área de fogata exclusiva.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: "mv-4",
    location: "Monteverde",
    title: "Villa Quetzal Exclusiva",
    type: "Villa",
    price: 550,
    inventory: 1,
    sqft: 200,
    description: "El máximo lujo en la reserva. Incluye mayordomo privado, senderos exclusivos y piscina térmica incrustada en roca.",
    image: "https://images.unsplash.com/photo-1586500036065-2184d048dc53?q=80&w=2574&auto=format&fit=crop"
  },
  
  // La Fortuna
  {
    id: "lf-1",
    location: "Arenal & La Fortuna",
    title: "Habitación Vista Volcán",
    type: "Standard",
    price: 180,
    inventory: 12,
    sqft: 50,
    description: "Despierta con vistas directas e interrumpidas al coloso Arenal. Diseño minimalista con tina interior de piedra.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2062&auto=format&fit=crop"
  },
  {
    id: "lf-2",
    location: "Arenal & La Fortuna",
    title: "Suite Aguas Termales Privadas",
    type: "Suite",
    price: 350,
    inventory: 4,
    sqft: 90,
    description: "Tu propio paraíso termal en el patio trasero. Aguas minerales directas del flujo volcánico 24/7.",
    image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=2600&auto=format&fit=crop"
  },
  {
    id: "lf-3",
    location: "Arenal & La Fortuna",
    title: "Lodge de Aventura",
    type: "Family",
    price: 290,
    inventory: 5,
    sqft: 110,
    description: "Base ideal para aventureros. Incluye muros de escalar infantiles y espacio para equipos.",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "lf-4",
    location: "Arenal & La Fortuna",
    title: "Gran Villa Tabacón Signature",
    type: "Villa",
    price: 850,
    inventory: 1,
    sqft: 350,
    description: "Nuestra propiedad más extensa. Piscina infinity fundiéndose con la selva, servicio de chef privado y helipuerto.",
    image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?q=80&w=2574&auto=format&fit=crop"
  }
];

export default function HomePage() {
  const [hasSearched, setHasSearched] = useState(false);
  const [heroCalendarActive, setHeroCalendarActive] = useState(false);
  const [searchKey, setSearchKey] = useState(0);
  const [searchParams, setSearchParams] = useState<any>({
    destination: 'Todos',
    checkIn: '15 Oct',
    checkOut: '21 Oct',
    adults: 2,
    children: 0,
    pets: 0
  });

  const handleSearchTrigger = (params: any) => {
    setSearchParams(params);
    setHasSearched(true);
    setSearchKey(prev => prev + 1);
  };

  const selectedDest = searchParams.destination;
  const filteredRooms = selectedDest && selectedDest !== 'Todos'
    ? mockRooms.filter(r => r.location === selectedDest)
    : mockRooms;

  return (
    <main className="min-h-screen bg-neutral-50 overflow-x-hidden selection:bg-emerald-900 selection:text-emerald-50">
      
      {/* 
        HEADER
      */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/40">
        <div className="w-full max-w-[1500px] mx-auto px-6 h-24 flex items-center justify-between">
          <div className="text-emerald-950 text-2xl font-serif font-black tracking-tighter cursor-pointer hover:opacity-80 transition" onClick={() => setHasSearched(false)}>
            EcoResorts<span className="text-emerald-600">CR</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-bold text-neutral-600">
            <button className="hover:text-emerald-900 transition-colors">¿Necesita Ayuda?</button>
            <button className="flex items-center gap-3 pl-6 border-l-2 border-neutral-200">
              <div className="text-right hidden md:block">
                <div className="text-neutral-900 leading-none mb-0.5">Mis Reservas</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <svg className="w-5 h-5 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
        
        {/* Pinned Search Bar for State B */}
        {hasSearched && (
          <div className="w-full bg-white pb-6 pt-2 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border-t border-neutral-100 animate-in fade-in slide-in-from-top-4 duration-500 flex justify-center px-6">
            <ModernSearchBar 
              size="compact"
              className="w-full max-w-5xl" 
              onSearch={handleSearchTrigger} 
              initialState={searchParams}
            />
          </div>
        )}
      </header>

      {/* 
        STATE A: HERO CENTERPIECE
      */}
      {!hasSearched && (
        <section className={`relative w-full h-screen flex flex-col items-center px-6 transition-[padding] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${heroCalendarActive ? 'pt-[14vh] pb-0' : 'pt-[18vh] pb-8'} animate-in fade-in duration-500`}>
           {/* Background subtle noise/texture */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
           
           <div className="w-full max-w-[1150px] mx-auto flex flex-col items-center text-center z-10">
            
            <div 
              className="grid w-full pointer-events-none"
              style={{
                transition: "opacity 300ms ease, transform 300ms ease, grid-template-rows 800ms cubic-bezier(0.22, 1, 0.36, 1) 300ms",
                opacity: heroCalendarActive ? 0 : 1,
                transform: heroCalendarActive ? 'translateY(-10px)' : 'translateY(0)',
                gridTemplateRows: heroCalendarActive ? '0fr' : '1fr',
              }}
            >
              <div className="overflow-hidden w-full flex flex-col items-center min-h-0">
                <h1 className="text-6xl md:text-8xl font-serif font-black text-emerald-950 tracking-tighter leading-[0.9] mb-6 pt-4 pointer-events-auto">
                  ¿Cuándo nos visitas?
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 font-medium mb-12 max-w-3xl pointer-events-auto">
                  Seleccione su destino, fechas y cantidad de personas
                </p>
              </div>
            </div>
            
            <div className="w-full transform transition-transform duration-500 flex justify-center mt-2">
              <ModernSearchBar 
                size="hero" 
                onSearch={handleSearchTrigger} 
                className="w-full max-w-[1150px]"
                onHeroCalendarOpen={() => setHeroCalendarActive(true)}
              />
            </div>

          </div>
        </section>
      )}

      {/* 
        STATE B: ROOM INVENTORY LIST
      */}
      {hasSearched && (
        <section className="relative w-full max-w-5xl mx-auto px-6 py-16 mt-[180px] animate-in fade-in slide-in-from-bottom-12 duration-700 fill-mode-both">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-emerald-900/10">
            <div>
              <div className="text-emerald-600 font-bold tracking-widest uppercase mb-2">Disponibilidad en tiempo real</div>
              <h2 className="text-4xl font-black text-emerald-950 tracking-tight">Opciones en {selectedDest || 'Todos nuestros destinos'}</h2>
            </div>
            
            <div className="mt-6 md:mt-0 px-4 py-2 bg-neutral-100 rounded-lg text-neutral-600 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {filteredRooms.length} habitaciones encontradas
            </div>
          </div>

          <div key={searchKey} className="flex flex-col gap-10">
            {filteredRooms.map((room, index) => {
              const isScarce = room.inventory <= 2;
              
              return (
                <div 
                  key={room.id} 
                  className="group flex flex-col lg:flex-row bg-white rounded-[2rem] overflow-hidden border-2 border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(4,120,87,0.12)] hover:border-emerald-200 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                  style={{ animationDelay: `${index * 150}ms`, animationDuration: '600ms' }}
                >
                  {/* Image Grid */}
                  <div className="relative w-full lg:w-[400px] h-[300px] lg:h-auto overflow-hidden flex-shrink-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                      style={{ backgroundImage: `url('${room.image}')` }}
                    />
                    
                    {/* Urgency Badge overlay */}
                    {isScarce && (
                      <div className="absolute top-4 left-4 bg-[#7a1313] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {room.inventory === 1 ? '¡Última habitación disponible!' : `Solo quedan ${room.inventory} habitaciones`}
                      </div>
                    )}
                  </div>

                  {/* Room Data */}
                  <div className="flex flex-col flex-1 p-8 lg:pr-10">
                    
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div>
                        {/* Selected dest isn't always known if they select "Todos", so show location as context if they searched generally */}
                        {(!selectedDest || selectedDest === 'Todos') && (
                          <p className="text-emerald-700 font-extrabold uppercase tracking-widest text-xs mb-2">{room.location}</p>
                        )}
                        <h3 className="text-3xl font-black text-neutral-900 leading-none group-hover:text-emerald-800 transition-colors">{room.title}</h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 font-bold text-sm rounded-lg border border-neutral-200">
                        {room.type} Tipo
                      </span>
                      <span className="text-neutral-500 font-medium flex items-center gap-1">
                        <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        {room.sqft} m²
                      </span>
                    </div>

                    <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl font-medium">
                      {room.description}
                    </p>

                    {/* Bold Price & Action Tier */}
                    <div className="mt-auto flex flex-col sm:flex-row items-end sm:items-center justify-between border-t-2 border-neutral-100 pt-8 gap-6">
                      
                      {/* Price Block */}
                      <div className="flex flex-col">
                        <div className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">Precio Promedio Por Noche</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black text-emerald-950 tracking-tighter">${room.price}</span>
                          <span className="text-lg font-bold text-neutral-500">USD</span>
                        </div>
                        {/* Subdued inventory stat if not scarce enough for badge */}
                        {!isScarce && (
                          <div className="text-sm font-medium text-emerald-700 mt-2 flex items-center gap-1">
                           <span className="w-2 h-2 rounded-full bg-emerald-500 opacity-60"></span> {room.inventory} disponibles para sus fechas
                          </div>
                        )}
                      </div>

                      {/* Explicit Action block */}
                      <button className="w-full sm:w-auto h-16 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-lg px-8 rounded-xl shadow-[0_8px_20px_rgba(2,44,34,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        Seleccionar y Continuar
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </section>
      )}

    </main>
  );
}
