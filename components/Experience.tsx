'use client';

export default function Experience() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-7xl w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          {/* Left side - Large 08 */}
          <div className="flex items-center justify-center md:justify-end">
            <h2 className="text-[150px] md:text-[200px] lg:text-[280px] font-bold text-promice-red leading-none">
              08
            </h2>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                YEARS OF
              </h3>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                SUCCESSFUL EXPERIENCE
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-lg md:text-xl text-white leading-relaxed">
                We are a leading <span className="text-promice-red font-semibold">Visual Effects Studio</span> dedicated to bringing <span className="text-promice-red font-semibold">Captivating</span> and <span className="text-promice-red font-semibold">Immersive</span> visual experiences to the <span className="text-promice-red font-semibold">World of Entertainment</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom description */}
        <div className="mt-16 md:mt-24">
          <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-5xl">
            Established in 2017, PROMICE brings eight years of creative mastery to the forefront. Specializing in VFX, Animations, Media Production, Branding, and Marketing, we've actively contributed to over 200 projects, delivering extraordinary creatives and visual effects. Our client-centric and creatively driven approach ensures a collaborative journey, transforming imagination into reality with each project.
          </p>
        </div>
      </div>
    </section>
  );
}
