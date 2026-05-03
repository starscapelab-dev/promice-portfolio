'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface Project {
  _id?: string;
  title: string;
  director: string;
  language: string;
  studio: string;
  category: 'latest' | 'upcoming';
  imageUrl?: string;
  description?: string;
  order: number;
  isPublished: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'latest' | 'upcoming'>('all');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Project>();

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects?admin=true');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Open modal for add/edit
  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      reset(project);
    } else {
      setEditingProject(null);
      reset({
        title: '',
        director: '',
        language: '',
        studio: '',
        category: 'latest',
        imageUrl: '',
        description: '',
        order: 0,
        isPublished: true,
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    reset();
  };

  // Submit form (create or update)
  const onSubmit = async (data: Project) => {
    setIsLoading(true);

    try {
      const url = editingProject
        ? `/api/projects/${editingProject._id}`
        : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(editingProject ? 'Project updated!' : 'Project created!');
        fetchProjects();
        closeModal();
      } else {
        toast.error('Failed to save project');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });

      if (res.ok) {
        toast.success('Project deleted!');
        fetchProjects();
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-promice-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'latest', 'upcoming'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              filter === f
                ? 'bg-promice-red text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-promice-red transition-colors"
          >
            <div className="aspect-[3/4] bg-gray-800 relative">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  No Image
                </div>
              )}
              {!project.isPublished && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                  Draft
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <div className="space-y-1 text-sm text-gray-400 mb-4">
                <p>Director: {project.director}</p>
                <p>Language: {project.language}</p>
                <p>Studio: {project.studio}</p>
                <p className="text-xs text-promice-red capitalize">{project.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(project)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(project._id!)}
                  className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No projects found. Add your first project!
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Director *
                  </label>
                  <input
                    {...register('director', { required: 'Director is required' })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                  {errors.director && (
                    <p className="text-red-500 text-sm mt-1">{errors.director.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Language *
                  </label>
                  <input
                    {...register('language', { required: 'Language is required' })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                  {errors.language && (
                    <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Studio *
                  </label>
                  <input
                    {...register('studio', { required: 'Studio is required' })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                  {errors.studio && (
                    <p className="text-red-500 text-sm mt-1">{errors.studio.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  >
                    <option value="latest">Latest</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    {...register('order', { valueAsNumber: true })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  {...register('imageUrl')}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('isPublished')}
                  id="isPublished"
                  className="w-4 h-4 text-promice-red bg-gray-800 border-gray-700 rounded focus:ring-promice-red"
                />
                <label htmlFor="isPublished" className="text-sm text-gray-300">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-promice-red hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
