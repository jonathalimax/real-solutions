export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Teal orb — top left */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '-80px',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(20,184,166,0.55) 0%, transparent 70%)',
          animation: 'float-orb 18s ease-in-out infinite',
        }}
      />
      {/* Indigo orb — right side */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '20%',
          right: '-60px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)',
          animation: 'float-orb 22s ease-in-out infinite reverse',
          animationDelay: '-6s',
        }}
      />
      {/* Sky blue orb — center */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '50%',
          left: '50%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.45) 0%, transparent 70%)',
          animation: 'pulse-glow 14s ease-in-out infinite',
          animationDelay: '-3s',
        }}
      />
      {/* Teal orb — bottom right */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: '-40px',
          right: '15%',
          width: '360px',
          height: '360px',
          background: 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)',
          animation: 'float-orb 20s ease-in-out infinite',
          animationDelay: '-10s',
        }}
      />
      {/* Indigo orb — bottom left */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: '10%',
          left: '-40px',
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          animation: 'float-orb 16s ease-in-out infinite reverse',
          animationDelay: '-8s',
        }}
      />
    </div>
  )
}
