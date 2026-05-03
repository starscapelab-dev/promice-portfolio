import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST() {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

    // Create admin user
    const admin = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@promice.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    });

    return NextResponse.json(
      { message: 'Admin user created successfully', email: admin.email },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { message: 'Error creating admin user' },
      { status: 500 }
    );
  }
}
