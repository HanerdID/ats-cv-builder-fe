// src/components/builder/SectionEditor.tsx
'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, X, Plus, Trash2 } from 'lucide-react';

const sectionLabels = {
  personal: 'Personal Information',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
};

export default function SectionEditor({ id, section, onUpdate, onToggle }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          <div
            {...attributes}
            {...listeners}
            className="cursor-move p-1 mr-2 text-gray-500 hover:text-gray-700"
          >
            <GripVertical size={18} />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            {sectionLabels[id]}
          </h3>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleExpandToggle}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="ml-2 p-1 text-gray-500 hover:text-red-600"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 py-5 sm:p-6">
          {/* Personal Section */}
          {id === "personal" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="personal_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="personal_name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={section?.name || ""}
                  onChange={(e) =>
                    onUpdate({ ...section, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="personal_email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="personal_email"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={section?.email || ""}
                  onChange={(e) =>
                    onUpdate({ ...section, email: e.target.value })
                  }
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="personal_phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="personal_phone"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={section?.phone || ""}
                  onChange={(e) =>
                    onUpdate({ ...section, phone: e.target.value })
                  }
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <label
                  htmlFor="personal_location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="personal_location"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={section?.location || ""}
                  onChange={(e) =>
                    onUpdate({ ...section, location: e.target.value })
                  }
                  placeholder="New York, NY"
                />
              </div>
              <div>
                <label
                  htmlFor="personal_linkedin"
                  className="block text-sm font-medium text-gray-700"
                >
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="personal_linkedin"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={section?.linkedin || ""}
                  onChange={(e) =>
                    onUpdate({ ...section, linkedin: e.target.value })
                  }
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label
                  htmlFor="personal_website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="personal_website"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={section?.website || ""}
                  onChange={(e) =>
                    onUpdate({ ...section, website: e.target.value })
                  }
                  placeholder="johndoe.com"
                />
              </div>
            </div>
          )}

          {/* Summary Section */}
          {id === "summary" && (
            <div>
              <label
                htmlFor="summary_text"
                className="block text-sm font-medium text-gray-700"
              >
                Professional Summary
              </label>
              <div className="mt-1">
                <textarea
                  id="summary_text"
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Experienced software engineer with 5+ years of expertise in developing enterprise-level applications..."
                  value={section?.text || ""}
                  onChange={(e) => onUpdate({ text: e.target.value })}
                ></textarea>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                A brief 3-4 sentence overview of your professional background,
                skills, and career goals.
              </p>
            </div>
          )}

          {/* Experience Section */}
          {id === "experience" && (
            <div className="space-y-6">
              {Array.isArray(section) &&
                section.map((job, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-medium text-gray-900">
                        Experience #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const newExperience = [...section];
                          newExperience.splice(index, 1);
                          onUpdate(newExperience);
                        }}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Company
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={job.company || ""}
                          onChange={(e) => {
                            const newExperience = [...section];
                            newExperience[index] = {
                              ...newExperience[index],
                              company: e.target.value,
                            };
                            onUpdate(newExperience);
                          }}
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Position
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={job.position || ""}
                          onChange={(e) => {
                            const newExperience = [...section];
                            newExperience[index] = {
                              ...newExperience[index],
                              position: e.target.value,
                            };
                            onUpdate(newExperience);
                          }}
                          placeholder="Job Title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={job.startDate || ""}
                          onChange={(e) => {
                            const newExperience = [...section];
                            newExperience[index] = {
                              ...newExperience[index],
                              startDate: e.target.value,
                            };
                            onUpdate(newExperience);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          End Date
                        </label>
                        <div className="flex items-center">
                          <input
                            type="date"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={job.endDate || ""}
                            disabled={job.current}
                            onChange={(e) => {
                              const newExperience = [...section];
                              newExperience[index] = {
                                ...newExperience[index],
                                endDate: e.target.value,
                              };
                              onUpdate(newExperience);
                            }}
                          />
                        </div>
                        <div className="mt-2 flex items-center">
                          <input
                            id={`current-job-${index}`}
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={job.current || false}
                            onChange={(e) => {
                              const newExperience = [...section];
                              newExperience[index] = {
                                ...newExperience[index],
                                current: e.target.checked,
                                endDate: e.target.checked
                                  ? ""
                                  : newExperience[index].endDate,
                              };
                              onUpdate(newExperience);
                            }}
                          />
                          <label
                            htmlFor={`current-job-${index}`}
                            className="ml-2 block text-sm text-gray-700"
                          >
                            I currently work here
                          </label>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={job.description || ""}
                          onChange={(e) => {
                            const newExperience = [...section];
                            newExperience[index] = {
                              ...newExperience[index],
                              description: e.target.value,
                            };
                            onUpdate(newExperience);
                          }}
                          placeholder="Describe your responsibilities and achievements"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}

              <button
                type="button"
                onClick={() => {
                  const newExperience = Array.isArray(section)
                    ? [...section]
                    : [];
                  newExperience.push({
                    company: "",
                    position: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: "",
                  });
                  onUpdate(newExperience);
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus size={16} className="mr-2" />
                Add Experience
              </button>
            </div>
          )}

          {/* Education Section */}
          {id === "education" && (
            <div className="space-y-6">
              {Array.isArray(section) &&
                section.map((edu, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-medium text-gray-900">
                        Education #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const newEducation = [...section];
                          newEducation.splice(index, 1);
                          onUpdate(newEducation);
                        }}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Institution
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={edu.institution || ""}
                          onChange={(e) => {
                            const newEducation = [...section];
                            newEducation[index] = {
                              ...newEducation[index],
                              institution: e.target.value,
                            };
                            onUpdate(newEducation);
                          }}
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Degree
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={edu.degree || ""}
                          onChange={(e) => {
                            const newEducation = [...section];
                            newEducation[index] = {
                              ...newEducation[index],
                              degree: e.target.value,
                            };
                            onUpdate(newEducation);
                          }}
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={edu.fieldOfStudy || ""}
                          onChange={(e) => {
                            const newEducation = [...section];
                            newEducation[index] = {
                              ...newEducation[index],
                              fieldOfStudy: e.target.value,
                            };
                            onUpdate(newEducation);
                          }}
                          placeholder="Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Graduation Year
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={edu.graduationYear || ""}
                          onChange={(e) => {
                            const newEducation = [...section];
                            newEducation[index] = {
                              ...newEducation[index],
                              graduationYear: e.target.value,
                            };
                            onUpdate(newEducation);
                          }}
                          placeholder="2020"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Description (Optional)
                        </label>
                        <textarea
                          rows={3}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={edu.description || ""}
                          onChange={(e) => {
                            const newEducation = [...section];
                            newEducation[index] = {
                              ...newEducation[index],
                              description: e.target.value,
                            };
                            onUpdate(newEducation);
                          }}
                          placeholder="Academic achievements, relevant coursework, etc."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}

              <button
                type="button"
                onClick={() => {
                  const newEducation = Array.isArray(section)
                    ? [...section]
                    : [];
                  newEducation.push({
                    institution: "",
                    degree: "",
                    fieldOfStudy: "",
                    graduationYear: "",
                    description: "",
                  });
                  onUpdate(newEducation);
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus size={16} className="mr-2" />
                Add Education
              </button>
            </div>
          )}

          {/* Skills Section */}
          {id === "skills" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Skills (separated by commas)
                </label>
                <textarea
                  rows={3}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={section?.keywords?.join(", ") || ""}
                  onChange={(e) => {
                    const skills = e.target.value
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter(Boolean);
                    onUpdate({
                      ...section,
                      keywords: skills,
                    });
                  }}
                  placeholder="JavaScript, React, Node.js, Python, SQL, AWS, Git"
                ></textarea>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  Skill Categories
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Group your skills by category to make them more organized.
                </p>

                {Array.isArray(section?.categories) &&
                  section.categories.map((category, catIndex) => (
                    <div
                      key={catIndex}
                      className="mt-4 border border-gray-200 rounded-md p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Category Name
                          </label>
                          <input
                            type="text"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={category.name || ""}
                            onChange={(e) => {
                              const newCategories = [...section.categories];
                              newCategories[catIndex] = {
                                ...newCategories[catIndex],
                                name: e.target.value,
                              };
                              onUpdate({
                                ...section,
                                categories: newCategories,
                              });
                            }}
                            placeholder="Programming Languages"
                          />

                          <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Skills in this category (separated by commas)
                            </label>
                            <textarea
                              rows={2}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={(category.skills || [])
                                .map((s) =>
                                  typeof s === "string" ? s : s.name
                                )
                                .join(", ")}
                              onChange={(e) => {
                                const skills = e.target.value
                                  .split(",")
                                  .map((skill) => ({
                                    name: skill.trim(),
                                    level: 3,
                                  }))
                                  .filter((skill) => skill.name);

                                const newCategories = [...section.categories];
                                newCategories[catIndex] = {
                                  ...newCategories[catIndex],
                                  skills,
                                };
                                onUpdate({
                                  ...section,
                                  categories: newCategories,
                                });
                              }}
                              placeholder="JavaScript, TypeScript, Python, Java"
                            ></textarea>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const newCategories = [...section.categories];
                            newCategories.splice(catIndex, 1);
                            onUpdate({
                              ...section,
                              categories: newCategories,
                            });
                          }}
                          className="ml-2 p-1 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                <button
                  type="button"
                  onClick={() => {
                    const newCategories = Array.isArray(section?.categories)
                      ? [...section.categories]
                      : [];
                    newCategories.push({
                      name: "",
                      skills: [],
                    });
                    onUpdate({
                      ...section,
                      categories: newCategories,
                    });
                  }}
                  className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus size={16} className="mr-2" />
                  Add Skill Category
                </button>
              </div>
            </div>
          )}

          {/* Projects Section */}
          {id === "projects" && (
            <div className="space-y-6">
              {Array.isArray(section) &&
                section.map((project, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-medium text-gray-900">
                        Project #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const newProjects = [...section];
                          newProjects.splice(index, 1);
                          onUpdate(newProjects);
                        }}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Project Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={project.title || ""}
                          onChange={(e) => {
                            const newProjects = [...section];
                            newProjects[index] = {
                              ...newProjects[index],
                              title: e.target.value,
                            };
                            onUpdate(newProjects);
                          }}
                          placeholder="E-commerce Website"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          URL (Optional)
                        </label>
                        <input
                          type="url"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={project.url || ""}
                          onChange={(e) => {
                            const newProjects = [...section];
                            newProjects[index] = {
                              ...newProjects[index],
                              url: e.target.value,
                            };
                            onUpdate(newProjects);
                          }}
                          placeholder="https://github.com/yourusername/project"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Technologies Used
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={(project.technologies || []).join(", ")}
                          onChange={(e) => {
                            const technologies = e.target.value
                              .split(",")
                              .map((tech) => tech.trim())
                              .filter(Boolean);
                            const newProjects = [...section];
                            newProjects[index] = {
                              ...newProjects[index],
                              technologies,
                            };
                            onUpdate(newProjects);
                          }}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={project.description || ""}
                          onChange={(e) => {
                            const newProjects = [...section];
                            newProjects[index] = {
                              ...newProjects[index],
                              description: e.target.value,
                            };
                            onUpdate(newProjects);
                          }}
                          placeholder="Describe the project, your role, and key achievements"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}

              <button
                type="button"
                onClick={() => {
                  const newProjects = Array.isArray(section)
                    ? [...section]
                    : [];
                  newProjects.push({
                    title: "",
                    url: "",
                    technologies: [],
                    description: "",
                  });
                  onUpdate(newProjects);
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus size={16} className="mr-2" />
                Add Project
              </button>
            </div>
          )}

          {/* Languages Section */}
          {id === "languages" && (
            <div className="space-y-6">
              {Array.isArray(section) &&
                section.map((language, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-grow">
                      <input
                        type="text"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={language.language || ""}
                        onChange={(e) => {
                          const newLanguages = [...section];
                          newLanguages[index] = {
                            ...newLanguages[index],
                            language: e.target.value,
                          };
                          onUpdate(newLanguages);
                        }}
                        placeholder="Language"
                      />
                    </div>
                    <div className="w-40">
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={language.proficiency || "Intermediate"}
                        onChange={(e) => {
                          const newLanguages = [...section];
                          newLanguages[index] = {
                            ...newLanguages[index],
                            proficiency: e.target.value,
                          };
                          onUpdate(newLanguages);
                        }}
                      >
                        <option>Native</option>
                        <option>Fluent</option>
                        <option>Advanced</option>
                        <option>Intermediate</option>
                        <option>Basic</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newLanguages = [...section];
                        newLanguages.splice(index, 1);
                        onUpdate(newLanguages);
                      }}
                      className="p-1 text-gray-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

              <button
                type="button"
                onClick={() => {
                  const newLanguages = Array.isArray(section)
                    ? [...section]
                    : [];
                  newLanguages.push({
                    language: "",
                    proficiency: "Intermediate",
                  });
                  onUpdate(newLanguages);
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus size={16} className="mr-2" />
                Add Language
              </button>
            </div>
          )}

          {/* Certifications Section */}
          {id === "certifications" && (
            <div className="space-y-6">
              {Array.isArray(section) &&
                section.map((cert, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-medium text-gray-900">
                        Certification #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const newCerts = [...section];
                          newCerts.splice(index, 1);
                          onUpdate(newCerts);
                        }}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Certification Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={cert.name || ""}
                          onChange={(e) => {
                            const newCerts = [...section];
                            newCerts[index] = {
                              ...newCerts[index],
                              name: e.target.value,
                            };
                            onUpdate(newCerts);
                          }}
                          placeholder="AWS Certified Solutions Architect"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Issuing Organization
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={cert.issuer || ""}
                          onChange={(e) => {
                            const newCerts = [...section];
                            newCerts[index] = {
                              ...newCerts[index],
                              issuer: e.target.value,
                            };
                            onUpdate(newCerts);
                          }}
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Issue Date
                        </label>
                        <input
                          type="date"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={cert.date || ""}
                          onChange={(e) => {
                            const newCerts = [...section];
                            newCerts[index] = {
                              ...newCerts[index],
                              date: e.target.value,
                            };
                            onUpdate(newCerts);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Expiration Date (Optional)
                        </label>
                        <input
                          type="date"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={cert.expiryDate || ""}
                          onChange={(e) => {
                            const newCerts = [...section];
                            newCerts[index] = {
                              ...newCerts[index],
                              expiryDate: e.target.value,
                            };
                            onUpdate(newCerts);
                          }}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Credential ID (Optional)
                        </label>
                        <input
                          type="text"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={cert.credentialID || ""}
                          onChange={(e) => {
                            const newCerts = [...section];
                            newCerts[index] = {
                              ...newCerts[index],
                              credentialID: e.target.value,
                            };
                            onUpdate(newCerts);
                          }}
                          placeholder="ABC123DEF456"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          URL (Optional)
                        </label>
                        <input
                          type="url"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={cert.url || ""}
                          onChange={(e) => {
                            const newCerts = [...section];
                            newCerts[index] = {
                              ...newCerts[index],
                              url: e.target.value,
                            };
                            onUpdate(newCerts);
                          }}
                          placeholder="https://www.credential.net/abc123def456"
                        />
                      </div>
                    </div>
                  </div>
                ))}

              <button
                type="button"
                onClick={() => {
                  const newCerts = Array.isArray(section) ? [...section] : [];
                  newCerts.push({
                    name: "",
                    issuer: "",
                    date: "",
                    expiryDate: "",
                    credentialID: "",
                    url: "",
                  });
                  onUpdate(newCerts);
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus size={16} className="mr-2" />
                Add Certification
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}