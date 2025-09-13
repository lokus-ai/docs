import React, { useEffect, useState } from 'react'

export const AnimatedHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: -2
    }}>
      {/* Animated mesh gradient background */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
            conic-gradient(from 0deg at 20% 30%, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1), rgba(240, 147, 251, 0.05), rgba(102, 126, 234, 0.1)),
            linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 50%, rgba(240, 147, 251, 0.03) 100%)
          `,
          animation: 'meshGradient 15s ease-in-out infinite'
        }}
      />
      
      {/* Floating particles */}
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              borderRadius: '50%',
              background: i % 3 === 0 
                ? 'rgba(102, 126, 234, 0.3)'
                : i % 3 === 1 
                ? 'rgba(118, 75, 162, 0.3)'
                : 'rgba(240, 147, 251, 0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle${i % 3} ${15 + Math.random() * 10}s linear infinite`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Dynamic light rays */}
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `
            conic-gradient(from ${mousePosition.x}deg at 50% 50%, 
              transparent 0deg,
              rgba(102, 126, 234, 0.05) 60deg,
              transparent 120deg,
              rgba(118, 75, 162, 0.05) 180deg,
              transparent 240deg,
              rgba(240, 147, 251, 0.05) 300deg,
              transparent 360deg
            )
          `,
          animation: 'rotate 30s linear infinite',
          filter: 'blur(2px)'
        }}
      />

      <style jsx>{`
        @keyframes meshGradient {
          0%, 100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05) rotate(1deg);
          }
        }
        
        @keyframes particle0 {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-100px) translateX(100px) rotate(360deg);
          }
        }
        
        @keyframes particle1 {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-100px) translateX(-50px) rotate(-180deg);
          }
        }
        
        @keyframes particle2 {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-100px) translateX(0px) rotate(180deg);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}