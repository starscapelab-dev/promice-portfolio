'use client';

const services = [
  {
    title: 'CGI & VISUAL EFFECTS',
    subtitle: 'Composition, Wire removals, Rotoscopy, Pre-Visualization, Matte painting, Clean ups, Virtual Reality and Augmented Reality.',
    description: 'Enhance your storytelling using our VFX skills. We skillfully combine real-world elements with imaginative ones, crafting breathtaking cinematic experiences that captivate and immerse audiences.'
  },
  {
    title: 'ANIMATION',
    subtitle: 'Character Animation, World Design, Storyboarding, 2D Animation, 3D Animation, Motion Graphics.',
    description: 'Bring your stories to life with captivating animation that features lively characters, dynamic worlds, and compelling storytelling resulting in unforgettable journeys.'
  },
  {
    title: '3D',
    subtitle: 'Modeling, Rigging, Texturing, Animation, Rendering, Simulation, Roto motion.',
    description: 'Our services encompass 3D animation, offering a range of visually immersive solutions for industries such as entertainment, gaming, simulations, and architectural visualization.'
  },
  {
    title: 'MOTION GRAPHICS',
    subtitle: 'Our offerings include motion graphics services, where we bring static graphics to life through dynamic movement, enhancing visual appeal in various multimedia presentations, videos, and promotional content.',
    description: 'Adding visually engaging animated elements to enhance videos or presentations.'
  },
  {
    title: 'DIGITAL INTERMEDIATE',
    subtitle: 'Color correction, DI coloring, HDR10 mastering, DCP conversation.',
    description: 'At our company, our Digital Intermediate services enhance filmmaking by skillfully combining advanced technology with artistic expertise. We specialize in carefully adjusting colors and enhancing visuals, aiming for a cinematic masterpiece that captivates and resonates with the audience.'
  },
  {
    title: 'COMMERCIALS',
    subtitle: 'Transform your brand into a visual story with our commercial production, where creativity meets strategy for impactful advertising.',
    description: 'Our commercial services turn concepts into compelling visuals, ensuring your brand stands out and resonates in the competitive market.'
  }
];

export default function Services() {
  return (
    <section className="min-h-screen px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 md:mb-24">
          OUR SERVICES
        </h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {services.map((service, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-promice-red">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {service.subtitle}
              </p>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
