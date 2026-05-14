export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Teal — top left, large */}
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          top: '-60px',
          left: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(20,184,166,0.7) 0%, rgba(20,184,166,0.2) 50%, transparent 70%)',
          animation: 'float-orb 12s ease-in-out infinite',
        }}
      />
      {/* Indigo — right, medium */}
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          top: '15%',
          right: '-40px',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.65) 0%, rgba(99,102,241,0.18) 50%, transparent 70%)',
          animation: 'float-orb-reverse 10s ease-in-out infinite',
          animationDelay: '-3s',
        }}
      />
      {/* Sky — center, pulsing */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '45%',
          left: '40%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.55) 0%, rgba(14,165,233,0.15) 50%, transparent 70%)',
          animation: 'pulse-glow 8s ease-in-out infinite',
          animationDelay: '-2s',
        }}
      />
      {/* Teal — bottom right */}
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          bottom: '-40px',
          right: '10%',
          width: '460px',
          height: '460px',
          background: 'radial-gradient(circle, rgba(20,184,166,0.6) 0%, rgba(20,184,166,0.15) 50%, transparent 70%)',
          animation: 'float-orb 14s ease-in-out infinite',
          animationDelay: '-6s',
        }}
      />
      {/* Indigo — bottom left */}
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          bottom: '5%',
          left: '-30px',
          width: '340px',
          height: '340px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.55) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)',
          animation: 'float-orb-reverse 11s ease-in-out infinite',
          animationDelay: '-5s',
        }}
      />
    </div>
  )
}
