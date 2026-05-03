import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import LatestProjects from '@/components/LatestProjects';
import UpcomingProjects from '@/components/UpcomingProjects';
import Clients from '@/components/Clients';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Experience />
      <Services />
      <LatestProjects />
      <UpcomingProjects />
      <Clients />
      <Contact />
    </main>
  );
}
