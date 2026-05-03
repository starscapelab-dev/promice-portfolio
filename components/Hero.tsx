'use client';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
      <div className="text-center max-w-6xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-12 md:mb-16">
          <div className="relative">
            {/* Logo image */}
            <img
              src="/images/Promice Logo-white text.png"
              alt="PROMICE Studios Logo"
              className="w-64 h-auto md:w-96 lg:w-[32rem] object-contain"
            />
          </div>
        </div>

        {/* Tagline */}
        <div className="space-y-2 md:space-y-4">
          <p className="text-xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed">
            "EMBARK ON A VISUAL ODYSSEY
          </p>
          <p className="text-xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed">
            WHERE REALITY BENDS TO OUR WILL"
          </p>
        </div>
      </div>
    </section>
  );
}
