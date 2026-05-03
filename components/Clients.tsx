'use client';

const clients = [
  'Weekend Blockbusters', 'Pauly Jr', 'Sushim Packer', 'Disney+ Hotstar', 'Magic Frames',
  'Friday Film House', 'Fragment Naveel Productions', 'Wayanad Cinemas', 'VTV Films',
  'RD Illuminations LLP', 'Kallara Golden Films', 'Vaiga Cine Entertainments', 'Magnet Cask',
  'Friday Film Sense', 'OPPO Renu Mahalnobis', 'TVS', 'Bajaj', 'Berger', 'Bharath Cement',
  'BINGO', 'Newspaper Boy', 'B.A.E', 'Kairali TMT', 'Blasters', 'Navarras', 'Kitchen Treasures',
  'Mythri Movie Makers', 'Amazon Prime Video', 'Sony LIV', 'myG'
];

export default function Clients() {
  return (
    <section className="min-h-screen px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 md:mb-24">
          OUR CLIENTS
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="aspect-square bg-white rounded-lg flex items-center justify-center p-4 hover:bg-promice-red hover:scale-105 transition-all duration-300 group"
            >
              <div className="text-center">
                <p className="text-xs md:text-sm font-semibold text-gray-800 group-hover:text-white transition-colors">
                  {client}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
