import React from 'react'

export const BlurredBlobs = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: -1
    }}>
      {/* Animated gradient blobs */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, rgba(102, 126, 234, 0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'blob1 20s ease-in-out infinite',
          top: '10%',
          left: '10%'
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.4) 0%, rgba(118, 75, 162, 0.1) 40%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'blob2 25s ease-in-out infinite',
          top: '60%',
          right: '10%'
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240, 147, 251, 0.3) 0%, rgba(240, 147, 251, 0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'blob3 30s ease-in-out infinite',
          top: '30%',
          right: '30%'
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 50%, transparent 80%)',
          filter: 'blur(80px)',
          animation: 'blob4 35s ease-in-out infinite',
          bottom: '10%',
          left: '20%'
        }}
      />

      <style jsx>{`
        @keyframes blob1 {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translateY(-50px) translateX(30px) scale(1.1);
          }
          66% {
            transform: translateY(20px) translateX(-20px) scale(0.9);
          }
        }
        
        @keyframes blob2 {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) translateX(-40px) scale(1.2) rotate(90deg);
          }
          50% {
            transform: translateY(40px) translateX(30px) scale(0.8) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) translateX(20px) scale(1.1) rotate(270deg);
          }
        }
        
        @keyframes blob3 {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          40% {
            transform: translateY(40px) translateX(-30px) scale(1.3);
          }
          80% {
            transform: translateY(-30px) translateX(40px) scale(0.7);
          }
        }
        
        @keyframes blob4 {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
          }
          20% {
            transform: translateY(-40px) translateX(20px) scale(1.1) rotate(72deg);
          }
          40% {
            transform: translateY(30px) translateX(-30px) scale(0.9) rotate(144deg);
          }
          60% {
            transform: translateY(-20px) translateX(40px) scale(1.2) rotate(216deg);
          }
          80% {
            transform: translateY(35px) translateX(-15px) scale(0.8) rotate(288deg);
          }
        }
      `}</style>
    </div>
  )
}