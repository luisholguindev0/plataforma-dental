"use client";

import { MapPin, Clock, Phone, Globe } from "lucide-react";

export default function Location() {
  return (
    <section id="ubicacion" className="section-lg relative">
      <div className="container mx-auto px-6">
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col lg:flex-row">
          {/* Info Panel */}
          <div className="lg:w-1/3 p-12 bg-black/40 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-white mb-8">Base de Operaciones</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-cyan-900/20 flex items-center justify-center text-cyan-400 group-hover:text-white transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Coordenadas</p>
                  <p className="text-white">Calle 58 #62-61</p>
                  <p className="text-gray-400">Barranquilla, Atlántico</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-purple-900/20 flex items-center justify-center text-purple-400 group-hover:text-white transition-colors">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Horario de Sistema</p>
                  <p className="text-white">Lun - Vie: 08:00 - 18:00</p>
                  <p className="text-gray-400">Sáb: 08:00 - 12:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-emerald-900/20 flex items-center justify-center text-emerald-400 group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Canal de Voz</p>
                  <p className="text-white">+57 301 499 0844</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a
                href="https://maps.google.com/?q=Calle+58+62-61+Barranquilla+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber w-full text-center block"
              >
                Iniciar Navegación
              </a>
            </div>
          </div>

          {/* Map Visualization */}
          <div className="lg:w-2/3 bg-gray-900 relative min-h-[400px]">
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               {/* Futuristic Map Placeholder */}
               <div className="relative w-full h-full bg-gray-800 overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0" 
                       style={{
                         backgroundImage: 'linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)',
                         backgroundSize: '40px 40px'
                       }}
                  />
                  
                  {/* Radar Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/30 rounded-full animate-[ping_3s_linear_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]" />
                  
                  <div className="absolute bottom-4 right-4 bg-black/80 p-2 rounded border border-cyan-500/30 text-xs font-mono text-cyan-400">
                    LAT: 10.9685 | LON: -74.7813
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
