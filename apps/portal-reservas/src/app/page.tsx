"use client";

import { useState } from "react";
import { ModernSearchBar } from "@hotel/ui";

const mockStays = [
  {
    id: 1,
    title: "Eco Lodge Bosque Nuboso",
    location: "Monteverde, Costa Rica",
    price: "$180",
    rating: "4.92",
    description: "Despierta entre las nubes en esta cabaña inmersa en la reserva biológica, ideal para el avistamiento de quetzales.",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Tabacón Thermal Resort",
    location: "Arenal & La Fortuna",
    price: "$350",
    rating: "4.98",
    description: "Aguas termales privadas y vistas directas al volcán desde tu villa premium de lujo.",
    image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=2600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Villa Paradis Manuel Antonio",
    location: "Manuel Antonio",
    price: "$210",
    rating: "4.88",
    description: "Escapada tropical con acceso directo al parque nacional y pasarelas sobre el dosel arbóreo.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2062&auto=format&fit=crop"
  }
];

export default function HomePage() {
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-50 overflow-x-hidden">
      
      {/* 
        HEADER 
        Always visible, minimal utility.
      */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/50">
        <div className="w-full max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-emerald-900 text-xl font-serif font-bold tracking-tight cursor-pointer" onClick={() => setHasSearched(false)}>
            EcoResorts<span className="text-emerald-600">CR</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium text-neutral-600">
            <button className="hover:text-neutral-900 transition-colors">Soporte</button>
            <button className="flex items-center gap-2 pl-4 border-l border-neutral-300">
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
        
        {/* Pinned Search Bar for State B */}
        {hasSearched && (
          <div className="w-full bg-white pb-4 pt-1 shadow-sm border-t border-neutral-100 animate-in fade-in slide-in-from-top-4 duration-500">
            <ModernSearchBar 
              className="max-w-5xl" 
              onSearch={() => console.log('Re-search')} 
            />
          </div>
        )}
      </header>

      {/* 
        STATE A: HERO CENTERPIECE
        Fades out and scales down when search triggers.
      */}
      {!hasSearched && (
        <section className="relative w-full h-screen flex flex-col items-center justify-center px-6 pt-20 animate-in fade-in duration-500">
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
            
            <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 tracking-tight leading-tight mb-4">
              Encuentra tu refugio ideal
            </h1>
            <p className="text-lg text-neutral-500 font-medium mb-12 max-w-2xl">
              Ingresa tu destino, fechas y cantidad de huéspedes para explorar opciones exclusivas en la naturaleza.
            </p>
            
            <div className="w-full transform scale-100 transition-transform duration-500">
              <ModernSearchBar onSearch={() => setHasSearched(true)} className="max-w-5xl" />
            </div>

          </div>
        </section>
      )}

      {/* 
        STATE B: RESULTS LIST
        Slides up and takes center stage after search. Bounded to same max-width.
      */}
      {hasSearched && (
        <section className="relative w-full max-w-5xl mx-auto px-6 py-12 mt-[160px] animate-in fade-in slide-in-from-bottom-12 duration-700 fill-mode-both">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-900">3 resultados disponibles</h2>
            <select className="bg-white border border-neutral-200 text-neutral-700 text-sm rounded-full px-4 py-2 outline-none cursor-pointer hover:bg-neutral-50 transition">
              <option>Recomendados</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
              <option>Mejor Valorados</option>
            </select>
          </div>

          <div className="flex flex-col gap-6">
            {mockStays.map((stay, index) => (
              <div 
                key={stay.id} 
                className="group flex flex-col md:flex-row bg-white rounded-3xl p-4 gap-6 border border-neutral-200 hover:shadow-xl transition-shadow cursor-pointer animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${index * 150}ms`, animationDuration: '600ms' }}
              >
                {/* Image */}
                <div className="relative w-full md:w-[320px] aspect-[4/3] md:aspect-auto md:h-[220px] rounded-2xl overflow-hidden flex-shrink-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${stay.image}')` }}
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50 transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 py-1 pr-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">{stay.location}</p>
                      <h3 className="text-2xl font-bold text-neutral-900 leading-tight group-hover:text-emerald-700 transition-colors">{stay.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg text-emerald-900 font-bold text-sm">
                      ★ {stay.rating}
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 leading-relaxed mb-6 max-w-xl">
                    {stay.description}
                  </p>

                  {/* Footer / Price */}
                  <div className="mt-auto flex items-end justify-between border-t border-neutral-100 pt-4">
                    <div className="flex gap-4 text-sm text-neutral-500">
                      <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> Desayuno incl.</span>
                      <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> Cancelación gratis</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-500 mb-0.5">Precio por noche</div>
                      <div className="text-2xl font-bold text-neutral-900 leading-none">{stay.price} <span className="text-sm font-normal text-neutral-500">USD</span></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

    </main>
  );
}
