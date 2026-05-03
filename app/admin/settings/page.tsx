'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';

interface SettingsForm {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<SettingsForm>({
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data: SettingsForm) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Settings updated successfully!');
        reset(data);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to update settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-center" />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email', { required: 'Email is required' })}
                    type="email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <hr className="border-gray-800" />

              <h3 className="text-lg font-semibold text-white">Change Password</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    {...register('currentPassword')}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    {...register('newPassword')}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register('confirmPassword', {
                      validate: (value) =>
                        newPassword === '' || value === newPassword || 'Passwords do not match'
                    })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-promice-red focus:border-transparent"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-promice-red hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Account Info</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400">Account Type</p>
                <p className="text-white font-semibold capitalize">{session?.user?.role || 'Admin'}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-white font-semibold">{session?.user?.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Member Since</p>
                <p className="text-white font-semibold">2024</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Security Tips</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Use a strong, unique password</li>
              <li>• Change your password regularly</li>
              <li>• Never share your credentials</li>
              <li>• Log out when using shared devices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
