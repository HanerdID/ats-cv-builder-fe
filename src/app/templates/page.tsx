// src/app/templates/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

// Template data
const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and traditional design perfect for corporate environments',
    atsScore: 95,
    thumbnail: '/templates/professional.png',
    colors: ['#2A4365', '#3182CE', '#4299E1', '#63B3ED'],
    popular: true,
    bestFor: ['Banking', 'Finance', 'Legal', 'Corporate'],
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary layout with a perfect balance of creativity and professionalism',
    atsScore: 92,
    thumbnail: '/templates/modern.png',
    colors: ['#285E61', '#38B2AC', '#4FD1C5', '#81E6D9'],
    popular: true,
    bestFor: ['Tech', 'Marketing', 'Design', 'Startups'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple, elegant design that lets your content shine',
    atsScore: 97,
    thumbnail: '/templates/minimal.png',
    colors: ['#1A202C', '#2D3748', '#4A5568', '#718096'],
    popular: false,
    bestFor: ['Academia', 'Research', 'Executive', 'Consulting'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative industries while maintaining ATS compatibility',
    atsScore: 88,
    thumbnail: '/templates/creative.png',
    colors: ['#702459', '#B83280', '#ED64A6', '#F687B3'],
    popular: false,
    bestFor: ['Graphic Design', 'Art Direction', 'UI/UX', 'Film & Media'],
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior professionals and executives',
    atsScore: 94,
    thumbnail: '/templates/executive.png',
    colors: ['#744210', '#975A16', '#D69E2E', '#ECC94B'],
    popular: true,
    bestFor: ['C-Level', 'Senior Management', 'Board Positions', 'Directors'],
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Optimized for technical roles with skills-focused layout',
    atsScore: 96,
    thumbnail: '/templates/technical.png',
    colors: ['#1A365D', '#2B6CB0', '#4299E1', '#90CDF4'],
    popular: false,
    bestFor: ['Software Development', 'Engineering', 'Data Science', 'IT'],
  },
];

// Filters
const filters = [
  { id: 'all', name: 'All Templates' },
  { id: 'highATS', name: 'Highest ATS Score' },
  { id: 'popular', name: 'Most Popular' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'creative', name: 'Creative' },
  { id: 'technical', name: 'Technical' },
];

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Apply filters
  const filteredTemplates = templates.filter((template) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "highATS" && template.atsScore >= 95) return true;
    if (activeFilter === "popular" && template.popular) return true;
    if (
      activeFilter === "corporate" &&
      template.bestFor.some((b) =>
        ["Banking", "Finance", "Legal", "Corporate", "Executive"].includes(b)
      )
    )
      return true;
    if (
      activeFilter === "creative" &&
      template.bestFor.some((b) =>
        [
          "Design",
          "Graphic Design",
          "Art Direction",
          "UI/UX",
          "Film & Media",
        ].includes(b)
      )
    )
      return true;
    if (
      activeFilter === "technical" &&
      template.bestFor.some((b) =>
        [
          "Tech",
          "Software Development",
          "Engineering",
          "Data Science",
          "IT",
        ].includes(b)
      )
    )
      return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-indigo-700 text-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                ATS-Optimized Resume Templates
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl">
                Choose from our collection of professionally designed templates,
                each optimized to pass through Applicant Tracking Systems.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeFilter === filter.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-200"
              >
                {/* Template Preview */}
                <div className="relative aspect-w-4 aspect-h-5 bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {template.thumbnail ? (
                      <Image
                        src={template.thumbnail}
                        alt={`${template.name} template`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span>Template Preview</span>
                    )}
                  </div>

                  {/* Popular Badge */}
                  {template.popular && (
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Popular</span>
                    </div>
                  )}

                  {/* ATS Score */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <svg
                      className="w-3 h-3 mr-1 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>ATS: {template.atsScore}%</span>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {template.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Color Palette */}
                  <div className="mt-3 flex space-x-2">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={`Template color ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Best For Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {template.bestFor.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {template.bestFor.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{template.bestFor.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedTemplate(template.id)}
                      className="flex-1 text-sm text-center px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Preview
                    </button>
                    <Link
                      href={`/builder/new?template=${template.id}`}
                      className="flex-1 text-sm text-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No templates found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your filter selection.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setActiveFilter("all")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  View All Templates
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Template Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {templates.find((t) => t.id === selectedTemplate)?.name}{" "}
                  Template Preview
                </h3>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="p-6 overflow-y-auto"
                style={{ maxHeight: "calc(90vh - 120px)" }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div className="bg-gray-100 rounded-lg aspect-w-4 aspect-h-5 flex items-center justify-center">
                      {templates.find((t) => t.id === selectedTemplate)
                        ?.thumbnail ? (
                        <Image
                          src={
                            templates.find((t) => t.id === selectedTemplate)
                              ?.thumbnail || ""
                          }
                          alt={`${
                            templates.find((t) => t.id === selectedTemplate)
                              ?.name
                          } template`}
                          width={400}
                          height={550}
                          objectFit="contain"
                        />
                      ) : (
                        <span className="text-gray-400">Full Preview</span>
                      )}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h4 className="text-xl font-medium text-gray-900">
                      {templates.find((t) => t.id === selectedTemplate)?.name}
                    </h4>
                    <p className="mt-2 text-gray-600">
                      {
                        templates.find((t) => t.id === selectedTemplate)
                          ?.description
                      }
                    </p>

                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-gray-900">
                        ATS Score
                      </h5>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{
                            width: `${
                              templates.find((t) => t.id === selectedTemplate)
                                ?.atsScore
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {
                          templates.find((t) => t.id === selectedTemplate)
                            ?.atsScore
                        }
                        % -
                        {templates.find((t) => t.id === selectedTemplate)
                          ?.atsScore || 0 >= 95
                          ? " Excellent"
                          : templates.find((t) => t.id === selectedTemplate)
                              ?.atsScore || 0 >= 90
                          ? " Very Good"
                          : " Good"}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-gray-900">
                        Best For
                      </h5>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {templates
                          .find((t) => t.id === selectedTemplate)
                          ?.bestFor.map((industry, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs"
                            >
                              {industry}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-gray-900">
                        Color Scheme
                      </h5>
                      <div className="mt-2 flex space-x-3">
                        {templates
                          .find((t) => t.id === selectedTemplate)
                          ?.colors.map((color, idx) => (
                            <div key={idx} className="relative">
                              <div
                                className="w-8 h-8 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                              ></div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`/builder/new?template=${selectedTemplate}`}
                        className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Use This Template
                        <svg
                          className="ml-2 -mr-1 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}