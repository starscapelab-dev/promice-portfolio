import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Project Schema (matching the model)
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    language: { type: String, required: true, trim: true },
    studio: { type: String, required: true, trim: true },
    category: { type: String, enum: ['latest', 'upcoming'], required: true },
    imageUrl: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// Latest Projects Data
const latestProjects = [
  {
    title: '1000 Babies',
    director: 'Najeem Koya',
    language: 'Malayalam',
    studio: 'August Cinemas - Jio-Hotstar',
    category: 'latest',
    order: 1,
    isPublished: true,
  },
  {
    title: 'Officer',
    director: 'Jithu Ashraf',
    language: 'Malayalam',
    studio: 'Martin Prakkat Films',
    category: 'latest',
    order: 2,
    isPublished: true,
  },
  {
    title: 'Bhaai',
    director: 'Binto Stephen',
    language: 'Malayalam',
    studio: 'Magic Frames',
    category: 'latest',
    order: 3,
    isPublished: true,
  },
  {
    title: 'ED - Extra Decent',
    director: 'Aamir Pallikkal',
    language: 'Malayalam',
    studio: 'Magic Frames',
    category: 'latest',
    order: 4,
    isPublished: true,
  },
  {
    title: 'Footage',
    director: 'Saiju Sreedharan',
    language: 'Malayalam',
    studio: 'Manju Warrier Productions',
    category: 'latest',
    order: 5,
    isPublished: true,
  },
  {
    title: 'I am Kathalan',
    director: 'Girish AD',
    language: 'Malayalam',
    studio: 'E4 Entertainment',
    category: 'latest',
    order: 6,
    isPublished: true,
  },
  {
    title: 'Murphy',
    director: 'BSP Varma',
    language: 'Kannada',
    studio: 'Govin Entertainments',
    category: 'latest',
    order: 7,
    isPublished: true,
  },
  {
    title: 'Uppu Kaapurambu',
    director: 'Anu IV Sasi',
    language: 'Telugu',
    studio: 'Amazon Originals',
    category: 'latest',
    order: 8,
    isPublished: true,
  },
  {
    title: 'Malyaglee From India',
    director: 'Dijo Jose Antony',
    language: 'Malayalam',
    studio: 'Magic Frames',
    category: 'latest',
    order: 9,
    isPublished: true,
  },
  {
    title: 'RDX',
    director: 'Nahas Hidhuqath',
    language: 'Malayalam',
    studio: 'Weekend Blockbusters',
    category: 'latest',
    order: 10,
    isPublished: true,
  },
  {
    title: 'United Kingdom Of Kerala',
    director: 'Arun Vaga',
    language: 'Malayalam',
    studio: 'Pragathi Nature Film Creations',
    category: 'latest',
    order: 11,
    isPublished: true,
  },
  {
    title: 'Manorathangal',
    director: 'MT Vasudevan Nair',
    language: 'Malayalam',
    studio: 'Zee5',
    category: 'latest',
    order: 12,
    isPublished: true,
  },
];

// Upcoming Projects Data
const upcomingProjects = [
  {
    title: 'Stombarts',
    director: 'George Sandeep',
    language: 'Malayalam',
    studio: 'Pauly Jr Pictures',
    category: 'upcoming',
    order: 1,
    isPublished: true,
  },
  {
    title: 'Pallickatharhu',
    director: 'Dijo Jose Antony',
    language: 'Malayalam',
    studio: 'World Wide Films',
    category: 'upcoming',
    order: 2,
    isPublished: true,
  },
  {
    title: 'Sarphhattam',
    director: 'Jinu Satheesan',
    language: 'Malayalam',
    studio: 'Nallicinema Productions',
    category: 'upcoming',
    order: 3,
    isPublished: true,
  },
  {
    title: 'Pooja Ceremony',
    director: 'Manu Ashokan',
    language: 'Malayalam',
    studio: 'Dreamcatcher Studios - Pauly Jr',
    category: 'upcoming',
    order: 4,
    isPublished: true,
  },
  {
    title: 'Ayodhayan 2 Sons',
    director: 'Thambu',
    language: 'Malayalam',
    studio: 'Magic Frames',
    category: 'upcoming',
    order: 5,
    isPublished: true,
  },
  {
    title: 'BHA BHA BA',
    director: 'Dhananjay Shankar',
    language: 'Malayalam',
    studio: 'Sree Gokulam Movies',
    category: 'upcoming',
    order: 6,
    isPublished: true,
  },
  {
    title: 'TIME YET TO ANNOUNCE',
    director: 'PR ARUN',
    language: 'Malayalam',
    studio: 'Theatre Of Dreams - Sanju V',
    category: 'upcoming',
    order: 7,
    isPublished: true,
  },
  {
    title: 'Cheetham Varna Pookum',
    director: 'Anuraj Manohar',
    language: 'Malayalam',
    studio: 'Pauly Jr Pictures',
    category: 'upcoming',
    order: 8,
    isPublished: true,
  },
  {
    title: 'Bhalo',
    director: 'Alifaz Khan',
    language: 'Malayalam',
    studio: 'Ellanor Films Productions',
    category: 'upcoming',
    order: 9,
    isPublished: true,
  },
  {
    title: 'Roslin',
    director: 'Sumesh Nandukumar',
    language: 'Malayalam',
    studio: 'Capital Advertising - Joekriz',
    category: 'upcoming',
    order: 10,
    isPublished: true,
  },
];

async function seedProjects() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing projects (optional - comment out if you want to keep existing data)
    console.log('Clearing existing projects...');
    await Project.deleteMany({});
    console.log('Existing projects cleared');

    // Insert latest projects
    console.log('Inserting latest projects...');
    const latestInserted = await Project.insertMany(latestProjects);
    console.log(`Inserted ${latestInserted.length} latest projects`);

    // Insert upcoming projects
    console.log('Inserting upcoming projects...');
    const upcomingInserted = await Project.insertMany(upcomingProjects);
    console.log(`Inserted ${upcomingInserted.length} upcoming projects`);

    console.log('\nSeed completed successfully!');
    console.log(`Total projects: ${latestInserted.length + upcomingInserted.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();
