export function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
       {/* Base image with moderate blur so nature is clearly visible */}
       <div 
          className="absolute -inset-[2%] bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop')",
            filter: "blur(8px)" 
          }}
       />
       {/* Organic light wash for perfect typography contrast without destroying the image */}
       <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
       {/* Subtle top-down gradient to ground the header/central UI */}
       <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent" />
    </div>
  );
}
