// src/app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Mail, Lock, CreditCard, Bell, Shield, LogOut } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import apiService from '@/services/api';
import Link from 'next/link';

// Form schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Tab type
type TabType = 'profile' | 'password' | 'billing' | 'notifications' | 'privacy';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form setup
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    setValue: setProfileValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  // Check authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }

    // Populate form with user data
    if (status === "authenticated" && session?.user) {
      setProfileValue("name", session.user.name || "");
      setProfileValue("email", session.user.email || "");

      // Fetch additional user data if available
      const fetchUserData = async () => {
        try {
          const response = await apiService.user.getProfile();
          const userData = response.data.data;

          if (userData) {
            setProfileValue("company", userData.company || "");
            setProfileValue("jobTitle", userData.jobTitle || "");
            setProfileValue("industry", userData.industry || "");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [status, session, router, setProfileValue]);

  // Handle profile update
  const onProfileSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      await apiService.user.updateProfile(data);

      setSuccessMessage("Profile updated successfully");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error || "Failed to update profile"
      );
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password update
  const onPasswordSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      await apiService.user.updatePassword(
        data.currentPassword,
        data.newPassword
      );

      setSuccessMessage("Password updated successfully");
      resetPasswordForm();
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error || "Failed to update password"
      );
      console.error("Error updating password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Account Settings
              </h1>
            </div>
          </div>

          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x">
              {/* Sidebar */}
              <aside className="px-4 py-6">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${
                      activeTab === "profile"
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span>Profile Information</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("password")}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${
                      activeTab === "password"
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Lock className="mr-3 h-5 w-5" />
                    <span>Password</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("billing")}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${
                      activeTab === "billing"
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <CreditCard className="mr-3 h-5 w-5" />
                    <span>Billing</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${
                      activeTab === "notifications"
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    <span>Notifications</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("privacy")}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${
                      activeTab === "privacy"
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Shield className="mr-3 h-5 w-5" />
                    <span>Privacy & Security</span>
                  </button>

                  <hr className="my-4" />

                  <button
                    onClick={() => {
                      // Handle logout
                    }}
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span>Sign out</span>
                  </button>
                </nav>
              </aside>

              {/* Main content */}
              <div className="col-span-3 px-4 py-6 md:px-8">
                {/* Success/Error Messages */}
                {successMessage && (
                  <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          {successMessage}
                        </p>
                      </div>
                      <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                          <button
                            onClick={() => setSuccessMessage(null)}
                            className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <span className="sr-only">Dismiss</span>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 10.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          {errorMessage}
                        </p>
                      </div>
                      <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                          <button
                            onClick={() => setErrorMessage(null)}
                            className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <span className="sr-only">Dismiss</span>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Profile Information
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Update your account profile information and settings.
                        </p>
                      </div>

                      <form
                        onSubmit={handleProfileSubmit(onProfileSubmit)}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* Name */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Full name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="name"
                                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                  profileErrors.name ? "border-red-300" : ""
                                }`}
                                {...registerProfile("name")}
                              />
                              {profileErrors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                  {profileErrors.name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Email */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <div className="mt-1">
                              <input
                                type="email"
                                id="email"
                                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                  profileErrors.email ? "border-red-300" : ""
                                }`}
                                {...registerProfile("email")}
                              />
                              {profileErrors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                  {profileErrors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Job Title */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="jobTitle"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Job Title
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="jobTitle"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                {...registerProfile("jobTitle")}
                              />
                            </div>
                          </div>

                          {/* Company */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="company"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Company
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="company"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                {...registerProfile("company")}
                              />
                            </div>
                          </div>

                          {/* Industry */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="industry"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Industry
                            </label>
                            <div className="mt-1">
                              <select
                                id="industry"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                {...registerProfile("industry")}
                              >
                                <option value="">Select an industry</option>
                                <option value="technology">Technology</option>
                                <option value="finance">Finance</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="education">Education</option>
                                <option value="retail">Retail</option>
                                <option value="manufacturing">
                                  Manufacturing
                                </option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                          >
                            {isLoading ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </form>

                      <div className="border-t border-gray-200 pt-6">
                        <div>
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Profile Photo
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Add a profile photo to personalize your account.
                          </p>
                        </div>

                        <div className="mt-6 flex items-center">
                          <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                            {session?.user?.image ? (
                              <img
                                src={session.user.image}
                                alt="Profile"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <User className="h-8 w-8 text-gray-400" />
                            )}
                          </div>
                          <div className="ml-5">
                            <button
                              type="button"
                              className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Upload new photo
                            </button>
                            <button
                              type="button"
                              className="ml-3 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Password Tab */}
                {activeTab === "password" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Change Password
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Update your password to keep your account secure.
                        </p>
                      </div>

                      <form
                        onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          {/* Current Password */}
                          <div>
                            <label
                              htmlFor="currentPassword"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Current Password
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                id="currentPassword"
                                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                  passwordErrors.currentPassword
                                    ? "border-red-300"
                                    : ""
                                }`}
                                {...registerPassword("currentPassword")}
                              />
                              {passwordErrors.currentPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                  {passwordErrors.currentPassword.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* New Password */}
                          <div>
                            <label
                              htmlFor="newPassword"
                              className="block text-sm font-medium text-gray-700"
                            >
                              New Password
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                id="newPassword"
                                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                  passwordErrors.newPassword
                                    ? "border-red-300"
                                    : ""
                                }`}
                                {...registerPassword("newPassword")}
                              />
                              {passwordErrors.newPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                  {passwordErrors.newPassword.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Confirm Password */}
                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Confirm New Password
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                id="confirmPassword"
                                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                  passwordErrors.confirmPassword
                                    ? "border-red-300"
                                    : ""
                                }`}
                                {...registerPassword("confirmPassword")}
                              />
                              {passwordErrors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                  {passwordErrors.confirmPassword.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Your password must be at least 6 characters and
                              should include a combination of numbers, letters
                              and special characters.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                          >
                            {isLoading ? "Updating..." : "Update Password"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}

                {/* Billing Tab */}
                {activeTab === "billing" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Billing Information
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Manage your subscription and payment methods.
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h4 className="text-base font-medium text-gray-900">
                          Current Plan
                        </h4>
                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Free Plan
                            </p>
                            <p className="text-sm text-gray-500">
                              Basic features for personal use
                            </p>
                          </div>
                          <Link
                            href="/pricing"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Upgrade Plan
                          </Link>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-base font-medium text-gray-900">
                          Payment Methods
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          No payment methods on file.
                        </p>

                        <button
                          type="button"
                          className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Add payment method
                        </button>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-base font-medium text-gray-900">
                          Billing History
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          No billing history available.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Notification Settings
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Manage your notification preferences.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Email Notifications
                          </h4>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="email-updates"
                                  name="email-updates"
                                  type="checkbox"
                                  defaultChecked
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="email-updates"
                                  className="font-medium text-gray-700"
                                >
                                  Product updates
                                </label>
                                <p className="text-gray-500">
                                  Get notified about new features and updates.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="email-marketing"
                                  name="email-marketing"
                                  type="checkbox"
                                  defaultChecked
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="email-marketing"
                                  className="font-medium text-gray-700"
                                >
                                  Marketing emails
                                </label>
                                <p className="text-gray-500">
                                  Receive tips, offers, and other promotional
                                  content.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="email-security"
                                  name="email-security"
                                  type="checkbox"
                                  defaultChecked
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="email-security"
                                  className="font-medium text-gray-700"
                                >
                                  Security alerts
                                </label>
                                <p className="text-gray-500">
                                  Get important notifications about your account
                                  security.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="text-sm font-medium text-gray-900">
                            Resume Updates
                          </h4>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="resume-tips"
                                  name="resume-tips"
                                  type="checkbox"
                                  defaultChecked
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="resume-tips"
                                  className="font-medium text-gray-700"
                                >
                                  Resume improvement tips
                                </label>
                                <p className="text-gray-500">
                                  Receive suggestions to improve your resume.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="ats-updates"
                                  name="ats-updates"
                                  type="checkbox"
                                  defaultChecked
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="ats-updates"
                                  className="font-medium text-gray-700"
                                >
                                  ATS algorithm updates
                                </label>
                                <p className="text-gray-500">
                                  Be notified when we update our ATS algorithms.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Privacy Tab */}
                {activeTab === "privacy" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Privacy & Security
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Manage your privacy settings and account security.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Two-Factor Authentication
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Add an extra layer of security to your account by
                            enabling two-factor authentication.
                          </p>
                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Enable two-factor authentication
                            </button>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="text-sm font-medium text-gray-900">
                            Data Privacy
                          </h4>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="data-collection"
                                  name="data-collection"
                                  type="checkbox"
                                  defaultChecked
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="data-collection"
                                  className="font-medium text-gray-700"
                                >
                                  Data collection consent
                                </label>
                                <p className="text-gray-500">
                                  Allow us to collect usage data to improve our
                                  services.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="text-sm font-medium text-gray-900">
                            Account Access
                          </h4>
                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              View active sessions
                            </button>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="text-sm font-medium text-red-600">
                            Delete Account
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Permanently delete your account and all associated
                            data. This action cannot be undone.
                          </p>
                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Delete account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}