import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Notfound() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 20 + 10,
      animationDelay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-800 flex items-center justify-center p-4 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #0f766e 100%)'
    }}>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-emerald-400 opacity-30"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.animationDuration}s linear infinite ${particle.animationDelay}s`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" style={{
        animation: 'pulse 3s ease-in-out infinite'
      }}></div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-emerald-400/30 rounded-full" style={{
        animation: 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite'
      }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-4 border-white/20 rounded-full" style={{
        animation: 'ping-slower 4s cubic-bezier(0, 0, 0.2, 1) infinite'
      }}></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        
        <div className="relative mb-8">
          <div className="text-9xl font-black text-white opacity-10 tracking-widest">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="text-9xl font-black drop-shadow-2xl" style={{
                background: 'linear-gradient(to right, #6ee7b7, #10b981, #5eead4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'glow 2s ease-in-out infinite'
              }}>
                404
              </div>
              <div className="absolute inset-0 text-9xl font-black opacity-50 blur-sm" style={{
                background: 'linear-gradient(to right, #ffffff, #d1fae5, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'glow-slow 3s ease-in-out infinite'
              }}>
                404
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-2xl" style={{
          animation: 'fade-in 1s ease-out'
        }}>
          الصفحة غير موجودة
        </h2>
        
        <p className="text-xl text-emerald-100 mb-12 leading-relaxed max-w-xl mx-auto" style={{
          animation: 'fade-in 1s ease-out 0.3s both'
        }}>
          الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو أنها غير متاحة مؤقتاً.
        </p>

        <Link 
          to='/#/' 
          className="group gap-10 relative inline-block px-10 py-5 text-white font-bold text-xl rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-500 overflow-hidden"
          style={{
            background: 'linear-gradient(to right, #10b981, #059669)'
          }}
        >
          <div className="absolute inset-0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" style={{
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)'
          }}></div>
          
          <span className="relative z-10 drop-shadow-lg">العودة للصفحة الرئيسية</span>
          
          <svg className="inline-block ml-10 w-5 h-5  mb-1 rtl:ml-2 rtl:mr-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Link>

        <div className="mt-16 flex justify-center space-x-4 rtl:space-x-reverse">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-4 h-4 rounded-full"
              style={{
                background: 'linear-gradient(to right, #6ee7b7, #10b981)',
                animation: `bounce 1s infinite ${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(120deg); }
            66% { transform: translateY(10px) rotate(240deg); }
          }
          
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 10px rgba(110, 231, 183, 0.5)); }
            50% { filter: drop-shadow(0 0 20px rgba(110, 231, 183, 0.8)); }
          }
          
          @keyframes glow-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
          
          @keyframes ping-slow {
            0% { transform: scale(0.8); opacity: 1; }
            75%, 100% { transform: scale(2.5); opacity: 0; }
          }
          
          @keyframes ping-slower {
            0% { transform: scale(0.8); opacity: 1; }
            75%, 100% { transform: scale(3); opacity: 0; }
          }
          
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          
          .group:hover {
            box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.4);
          }
        `}
      </style>
    </div>
  );
}