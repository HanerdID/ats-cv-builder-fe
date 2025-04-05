// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ChevronRight,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Award,
  Download,
} from "lucide-react";
import apiService from "@/services/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { saveAs } from "file-saver";

interface Resume {
  _id: string;
  title: string;
  template: string;
  createdAt: string;
  updatedAt: string;
  atsData?: {
    lastScore?: number;
  };
}

const templates = {
  professional: { color: "blue", label: "Professional" },
  modern: { color: "teal", label: "Modern" },
  minimal: { color: "gray", label: "Minimal" },
  creative: { color: "purple", label: "Creative" },
  executive: { color: "amber", label: "Executive" },
  technical: { color: "indigo", label: "Technical" },
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "score">("date");

  useEffect(() => {
    // Check if user is authenticated
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }

    // Fetch user's resumes
    if (status === "authenticated") {
      const fetchResumes = async () => {
        try {
          setIsLoading(true);
          const response = await apiService.resume.getAll();
          setResumes(response.data.data);
        } catch (error) {
          console.error("Error fetching resumes:", error);
          setError("Failed to load your resumes. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchResumes();
    }
  }, [status, router]);

  const handleDeleteResume = async (id: string) => {
    try {
      setDeleteLoading(true);
      await apiService.resume.delete(id);
      // Remove deleted resume from state
      setResumes(resumes.filter((resume) => resume._id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting resume:", error);
      setError("Failed to delete resume. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDuplicateResume = async (id: string) => {
    try {
      const response = await apiService.resume.duplicate(id);
      // Add new resume to state
      setResumes([...resumes, response.data.data]);
    } catch (error) {
      console.error("Error duplicating resume:", error);
      setError("Failed to duplicate resume. Please try again.");
    }
  };

  const handleDownloadPdf = async (id: string) => {
    try {
      const response = await apiService.resume.exportPdf(id);
      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, `resume_${id}.pdf`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setError("Failed to download PDF. Please try again.");
    }
  };

  // Filter and sort resumes
  const filteredResumes = resumes
    .filter(resume => 
      resume.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "score") {
        const scoreA = a.atsData?.lastScore || 0;
        const scoreB = b.atsData?.lastScore || 0;
        return scoreB - scoreA;
      } else {
        // Default: sort by date
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <span className="mr-2">My Resumes</span>
                <span className="text-sm bg-indigo-100 text-indigo-800 py-0.5 px-2 rounded-full">
                  {resumes.length}
                </span>
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your ATS-optimized resumes
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/builder/new"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Resume
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p>{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and filters */}
        <div className="bg-white shadow rounded-lg mb-6 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Sort by:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSortBy("date")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    sortBy === "date"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Calendar className="inline-block mr-1 h-4 w-4" />
                  Date
                </button>
                <button
                  onClick={() => setSortBy("name")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    sortBy === "name"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="inline-block mr-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                  Name
                </button>
                <button
                  onClick={() => setSortBy("score")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    sortBy === "score"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Award className="inline-block mr-1 h-4 w-4" />
                  ATS Score
                </button>
              </div>
            </div>
          </div>
        </div>

        {filteredResumes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white overflow-hidden shadow rounded-lg p-8 text-center"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {searchTerm ? "No matching resumes found" : "No resumes yet"}
            </h3>
            <p className="mt-1 text-gray-500">
              {searchTerm
                ? "Try a different search term or clear your search"
                : "Start by creating your first ATS-optimized resume"}
            </p>
            <div className="mt-6">
              <Link
                href="/builder/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
                Create Resume
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredResumes.map((resume, index) => (
                <motion.div
                  key={resume._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white overflow-hidden shadow rounded-lg group relative"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 truncate max-w-[200px]">
                        {resume.title}
                      </h3>
                      {resume.atsData?.lastScore !== undefined && (
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            resume.atsData.lastScore >= 90
                              ? "bg-green-100 text-green-800"
                              : resume.atsData.lastScore >= 75
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <Award className="mr-1 h-3 w-3" />
                          ATS: {resume.atsData.lastScore}%
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        {templates[resume.template as keyof typeof templates]
                          ?.label ||
                          resume.template.charAt(0).toUpperCase() +
                            resume.template.slice(1)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        Updated{" "}
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-4 flex justify-between space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDuplicateResume(resume._id)}
                        className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        aria-label="Duplicate"
                      >
                        <Copy className="mr-1 h-3.5 w-3.5" />
                        Duplicate
                      </motion.button>

                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`/builder/${resume._id}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Edit className="mr-1 h-3.5 w-3.5" />
                        Edit
                      </motion.a>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDeleteConfirm(resume._id)}
                        className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                    <Link
                      href={`/preview/${resume._id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                    >
                      Preview
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDownloadPdf(resume._id)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Delete confirmation modal */}
                  {showDeleteConfirm === resume._id && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center p-4 z-10">
                      <p className="text-sm text-center mb-4">
                        Are you sure you want to delete this resume?
                      </p>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-3 py-1.5 bg-gray-200 text-gray-800 text-xs font-medium rounded-md"
                          disabled={deleteLoading}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDeleteResume(resume._id)}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md"
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}