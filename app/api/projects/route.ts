import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';

// GET all projects
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isAdmin = searchParams.get('admin') === 'true';

    const query: any = {};

    if (category) {
      query.category = category;
    }

    // Only show published projects for non-admin users
    if (!isAdmin) {
      query.isPublished = true;
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Error fetching projects' },
      { status: 500 }
    );
  }
}

// POST - Create new project (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const project = await Project.create(body);

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { message: 'Error creating project' },
      { status: 500 }
    );
  }
}
