"use client";

import { Award, GraduationCap, Heart, Users, Database, Cpu } from "lucide-react";

const stats = [
  { value: "10+", label: "Ciclos Solares", icon: Award },
  { value: "500+", label: "Actualizaciones Exitosas", icon: Users },
  { value: "100%", label: "Sincronización", icon: Heart },
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-lg relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side - Holographic Projection */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Hologram Base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-4 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
              
              {/* Image Container with Glitch/Scan effect */}
              <div className="relative glass-card rounded-3xl overflow-hidden aspect-[4/5] border border-cyan-500/30">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-transparent to-transparent z-10" />
                
                {/* Scanline */}
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />
                
                {/* Placeholder for Doctor Image */}
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <div className="text-center relative z-10">
                     <div className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-cyan-400/50 flex items-center justify-center bg-cyan-900/20">
                       <span className="font-mono text-5xl text-cyan-400">JM</span>
                     </div>
                     <div className="text-cyan-200 text-xs uppercase tracking-widest">Imagen No Disponible</div>
                  </div>
                </div>

                {/* Data Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-30">
                   <div className="glass-panel p-4 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-xs text-cyan-400 uppercase tracking-wider">Identificación</span>
                         <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]" />
                      </div>
                      <div className="font-mono text-white text-lg">Dr. Jhoiner Marquez</div>
                      <div className="text-gray-400 text-sm">Operador Especialista</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-4">
                <Database size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.2em]">Archivo del Especialista</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Ingeniería Dental <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">De Alta Precisión</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Combino la biología humana con la tecnología digital avanzada. Mi enfoque no es solo reparar, sino optimizar la estructura dental para una funcionalidad y estética superiores.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-8 border-y border-white/5">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-cyan-400">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Cpu size={18} className="text-purple-400" />
                Certificaciones del Sistema
              </h3>
              <ul className="space-y-3">
                {[
                  "Odontólogo General - Universidad del Norte",
                  "Especialización en Estética Dental",
                  "Certificación en Diseño Digital de Sonrisa",
                ].map((cred, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-400 text-sm group">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:shadow-[0_0_8px_#a855f7] transition-all" />
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
