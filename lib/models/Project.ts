import mongoose, { Schema, model, models } from 'mongoose';

export interface IProject {
  _id: string;
  title: string;
  director: string;
  language: string;
  studio: string;
  category: 'latest' | 'upcoming';
  imageUrl?: string;
  description?: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    director: {
      type: String,
      required: [true, 'Director is required'],
      trim: true,
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
      trim: true,
    },
    studio: {
      type: String,
      required: [true, 'Studio is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['latest', 'upcoming'],
      required: [true, 'Category is required'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
ProjectSchema.index({ category: 1, order: 1 });

const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
