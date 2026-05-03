'use client';

import { useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  director: string;
  language: string;
  studio: string;
  imageUrl?: string;
}

export default function UpcomingProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects?category=upcoming')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-promice-red mb-16 md:mb-24">
          UPCOMING PROJECTS
        </h2>

        {isLoading ? (
          <div className="text-center text-gray-400 py-12">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No projects available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                {/* Project info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="space-y-1 text-sm md:text-base text-white/80">
                    <p>Language: {project.language}</p>
                    <p>Director: {project.director}</p>
                    <p className="text-xs md:text-sm">{project.studio}</p>
                  </div>
                </div>

                {/* Decorative border on hover */}
                <div className="absolute inset-0 border-2 border-promice-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
