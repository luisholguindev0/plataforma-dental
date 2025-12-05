"use client";

import { ArrowRight, Sparkles, Shield, Zap, Activity, Hexagon } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  { icon: Zap, text: "Tecnología Láser" },
  { icon: Shield, text: "Bioseguridad Nivel 5" },
  { icon: Activity, text: "Escaneo 3D en Tiempo Real" },
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Dynamic Light Source */}
      <div 
        className="absolute pointer-events-none opacity-30 blur-[100px] transition-transform duration-100 ease-out will-change-transform"
        style={{
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * -2 - 50}%, ${mousePos.y * -2 - 50}%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 glass-panel px-6 py-3 rounded-full text-sm font-medium text-cyan-300 border border-cyan-900/50 animate-fade-in">
              <Sparkles size={16} className="animate-pulse" />
              <span className="tracking-widest uppercase">Futuro Dental Integrado</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in delay-100">
              Tu Sonrisa <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse-glow">
                Redefinida
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in delay-200">
              Dr. Jhoiner Marquez. Arquitectura dental de precisión. 
              Donde la biología se encuentra con la tecnología avanzada para resultados perfectos.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in delay-300">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573014990844"}?text=Hola Dr. Jhoiner, quiero acceder al futuro.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Iniciar Protocolo
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="#servicios"
                className="px-8 py-3 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-900/10 transition-all duration-300 text-gray-300 hover:text-cyan-300"
              >
                Explorar Sistemas
              </a>
            </div>

            {/* Tech Specs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 animate-fade-in delay-400 border-t border-white/5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-default"
                >
                  <feature.icon size={20} />
                  <span className="text-sm uppercase tracking-wider font-semibold">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Interface */}
          <div className="relative hidden lg:block perspective-1000">
            <div 
              className="relative w-full aspect-square max-w-lg mx-auto transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`
              }}
            >
              {/* Holographic Ring */}
              <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Central Hub */}
              <div className="absolute inset-0 m-auto w-64 h-64 glass-card rounded-full flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-purple-900/20" />
                 <div className="text-center z-10">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">JM</div>
                    <div className="text-xs uppercase tracking-[0.5em] text-cyan-400 mt-2">System v2.0</div>
                 </div>
                 
                 {/* Scanning Line */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-[scan_3s_ease-in-out_infinite]" />
              </div>

              {/* Floating Data Modules */}
              <div className="absolute -right-12 top-1/4 glass-panel p-4 rounded-xl animate-float delay-100">
                <div className="flex items-center gap-4">
                  <Hexagon className="text-purple-400 animate-pulse" size={32} />
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Estado</div>
                    <div className="text-lg font-bold text-white">Optimizado</div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-8 bottom-1/3 glass-panel p-4 rounded-xl animate-float delay-300">
                <div className="flex items-center gap-4">
                  <Activity className="text-cyan-400" size={32} />
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Precisión</div>
                    <div className="text-lg font-bold text-white">99.9%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-widest text-cyan-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
      </div>
    </section>
  );
}
